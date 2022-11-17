FROM node:16 as dependencies

WORKDIR /qwik-quiz
COPY package*.json ./
RUN npm install --frozen-lockfile

FROM node:16 as builder
WORKDIR /qwik-quiz
COPY . .
COPY --from=dependencies /qwik-quiz/node_modules ./node_modules
RUN npm run build

FROM node:16 as runner
WORKDIR /qwik-quiz
COPY --from=builder /qwik-quiz/public ./public
COPY --from=builder /qwik-quiz/dist ./dist
COPY --from=builder /qwik-quiz/node_modules ./node_modules
COPY --from=builder /qwik-quiz/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "dev"]
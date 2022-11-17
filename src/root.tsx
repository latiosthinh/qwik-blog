import { useStore, useServerMount$, component$ } from '@builder.io/qwik';
import { QwikCity } from '@builder.io/qwik-city';
import Card from './components/card/card';
import { firestore } from './data/firebase';
import { collection, getDocs } from 'firebase/firestore';
import "./styles/global.css";

export default component$(() => {
  const state = useStore({ data: [] });

  useServerMount$(async () => {
    const data: any[] = [];
    const posts = collection(firestore, "posts");
    const querySnapshot = await getDocs(posts);

    querySnapshot.forEach( snapshot => {
      data.push( snapshot.data() )
    } )
  
    state.data = JSON.parse( JSON.stringify( data ) );
  });

  return (
    <QwikCity>
      <head>
        <title>Quiz Blog</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body lang="en">
        <main className='max-w-sm mx-auto mt-5'>
          {
            state.data && state.data.map((p: { main_image: string; id: string; title: string; excerpt: string }) =>
              <Card title={p.title} excerpt={p.excerpt} imgUrl={p.main_image} /> 
            )
          }
        </main>
      </body>
    </QwikCity>
  );
});

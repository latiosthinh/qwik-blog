import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAt9AUalXVmxPnTegjE1Dl7qSgR6ow14Xc",
	authDomain: "blog-3085b.firebaseapp.com",
	projectId: "blog-3085b",
	storageBucket: "blog-3085b.appspot.com",
	messagingSenderId: "132184319348",
	appId: "1:132184319348:web:176bfde0d894c8e6577821",
	measurementId: "G-K1QFZPFDE1"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const fireStorage = getStorage(app);

export { firestore, fireStorage };
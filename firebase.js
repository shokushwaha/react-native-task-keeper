import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCG_7RS1dQZOj71vzhbC8AacArRaC2vJ6g",
    authDomain: "react-native-taskmanager.firebaseapp.com",
    databaseURL: "https://react-native-taskmanager-default-rtdb.firebaseio.com",
    projectId: "react-native-taskmanager",
    storageBucket: "react-native-taskmanager.appspot.com",
    messagingSenderId: "918115165236",
    appId: "1:918115165236:web:f8c47ed1170496da019661"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
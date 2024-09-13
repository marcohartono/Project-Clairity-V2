// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_p27pJXHVuEwFMgc6Hf1aKOWkyVm6WxE",
    authDomain: "project-aqi-fe792.firebaseapp.com",
    projectId: "project-aqi-fe792",
    storageBucket: "project-aqi-fe792.appspot.com",
    messagingSenderId: "978396529235",
    appId: "1:978396529235:web:a882ec84f95f2200a07ca6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Initialize Firestore

const firestore = {
    async storeData(params) {
        try {
            const docRef = await addDoc(collection(db, "feedbacks"), {
                device_id: "device_id", // replace later using parameter
                mood_rating: 5, // replace later using parameter
                timestamp: Timestamp.fromDate(new Date)
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

export default firestore
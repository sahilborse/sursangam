// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzwzaElB94oZTC6ljpc3qAepUo3J5aQU0",
  authDomain: "notemint-a3c60.firebaseapp.com",
  projectId: "notemint-a3c60",
  storageBucket: "notemint-a3c60.appspot.com",
  messagingSenderId: "821355895020",
  appId: "1:821355895020:web:7a3a35adff5e22bbdeadc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)

const checkUserExists = async (userId) => {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) {
      console.log("User exists:", snapshot.val());
      return true;
    } else {
      console.log("No such user.");
      return false;
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  }
};
export {fireDB,auth } ; 
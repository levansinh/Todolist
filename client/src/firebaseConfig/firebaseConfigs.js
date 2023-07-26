import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyA_AE1ODbpgzvSXzqexT_i8AKHg1P6niM8",
  authDomain: "auth-a1de7.firebaseapp.com",
  projectId: "auth-a1de7",
  storageBucket: "auth-a1de7.appspot.com",
  messagingSenderId: "329439529196",
  appId: "1:329439529196:web:85d9f5b146f3806b6cfdc9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const name = result.user.displayName;
        const profilePic = result.user.photoURL;
        const userId = result.user.uid;
        localStorage.setItem('name', name);
        localStorage.setItem('profilePic', profilePic);
        localStorage.setItem('idUser', userId);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};

export const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem('name');
    localStorage.removeItem('profilePic');
    localStorage.removeItem('idUser');
    window.location.reload();
};



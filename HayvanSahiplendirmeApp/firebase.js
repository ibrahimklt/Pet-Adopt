//C:\Users\kilit\Desktop\deneme\HayvanSahiplendirmeApp\firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyBZNbp4Pf5eLDkQl9JLUV6mXxKRfivYEDo",
  authDomain: "deneme-956a9.firebaseapp.com",
  projectId: "deneme-956a9",
  storageBucket: "deneme-956a9.firebasestorage.app",
  messagingSenderId: "14460447613",
  appId: "1:14460447613:web:46a6eee430ca45233eba14",
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firebase Auth'u AsyncStorage ile başlatma (oturum kalıcı olacak)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore'u başlatma
const firestore = getFirestore(app);

export { auth, firestore };

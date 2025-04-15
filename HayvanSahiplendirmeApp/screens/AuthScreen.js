//C:\Users\kilit\Desktop\deneme\HayvanSahiplendirmeApp\screens\AuthScreen.js
import React, { useState,useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Yeni SDK'da fonksiyonlar ayrı import edilir

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = () => {
    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password) // Yeni fonksiyon kullanımı
        .then((userCredential) => {
         console.log("User registered:", userCredential.user);
        })
        .catch((error) => alert(error.message));
    } else {
      signInWithEmailAndPassword(auth, email, password) // Yeni fonksiyon kullanımı
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>{isRegistering ? "Kayıt Ol" : "Giriş Yap"}</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isRegistering ? "Kayıt Ol" : "Giriş Yap"} onPress={handleAuth} />
      <Button
        title={isRegistering ? "Giriş Yapmak İçin Tıklayın" : "Kayıt Olmak İçin Tıklayın"}
        onPress={() => setIsRegistering(!isRegistering)}
      />
    </View>
  );
}
import { collection, onSnapshot } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from "react-native";

export default function FavoritesScreen() {
  const [favoritePets, setFavoritePets] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        collection(firestore, "favAnimal", currentUser.uid, "favorites"),
        (snapshot) => {
          const petsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setFavoritePets(petsData);
        }
      );

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.baslık}>Favorilerin</Text>
      <FlatList
        data={favoritePets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>Adı: {item.name}</Text>
                <Text style={styles.text}>Yaşı: {item.age}</Text>
                <Text style={styles.text}>Cinsi: {item.breed}</Text>
                <Text style={styles.text}>Şehir: {item.city}</Text>
                <Text style={styles.text}>İletişim Numarası: {item.contactNumber}</Text>
              </View>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
    padding: 10,
    marginTop: 33,
  },
  baslık: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: 'row', // Yatay yerleşim
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // Metinlerin bulunduğu alanı genişletir
    marginRight: 10,
  },
  image: {
    width: 100, // Görsel genişliği
    height: 100, // Görsel yüksekliği
    borderRadius: 10, // Görsel köşelerini yuvarlar
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
});

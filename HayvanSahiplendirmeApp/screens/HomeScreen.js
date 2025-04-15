import { getDocs, collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text, Image } from "react-native";
import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import styles from "./HomeStyle";

export default function HomeScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const petsCollection = collection(firestore, "pets");

    const unsubscribe = onSnapshot(petsCollection, (snapshot) => {
      const petList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPets(petList);
      setFilteredPets(petList);
    });

    return () => unsubscribe();
  }, []);

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredPets(pets);
    } else {
      setSelectedCategory(category);
      const filteredList = pets.filter((pet) => pet.category === category);
      setFilteredPets(filteredList);
    }
  };

  const handleAddToFavorites = async (pet) => {
    if (currentUser) {
      const userFavoritesRef = doc(
        firestore,
        "favAnimal",
        currentUser.uid,
        "favorites",
        pet.id
      );
      await setDoc(userFavoritesRef, pet);
      alert(`${pet.name} favorilere eklendi!`);
    } else {
      alert("Lütfen giriş yapın!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {['dog', 'fish', 'cat', 'bird'].map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleCategorySelect(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
          >
            <Text style={styles.categoryText}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredPets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PetDetails", { pet: item })}
            style={styles.card}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>{item.breed}</Text>
              <Text style={styles.text}>{item.age} YRS</Text>
              <TouchableOpacity
                onPress={() => handleAddToFavorites(item)}
                style={styles.favoriteButton}
              >
                <Text style={styles.favoriteButtonText}>Favorilere Ekle</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

//C:\Users\kilit\Desktop\deneme\HayvanSahiplendirmeApp\screens\ProfileScreen .js
import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { auth, firestore } from "../firebase";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const currentUser = auth.currentUser;
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (currentUser) {
      const q = query(
        collection(firestore, "pets"),
        where("owner", "==", currentUser.uid)
      );

      // onSnapshot ile anlık veri güncellemesi
      unsubscribe = onSnapshot(q, (snapshot) => {
        const petsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserPets(petsData);
      });
    }

    // Cleanup fonksiyonu (component unmount olduğunda dinlemeyi bırakır)
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  const handleDeletePet = async (petId) => {
    try {
      // Firestore'dan hayvanı sil
      const petDocRef = doc(firestore, "pets", petId);
      await deleteDoc(petDocRef);
      Alert.alert("Başarılı", "Hayvan başarıyla silindi!");
    } catch (error) {
      console.error("Hayvan silinirken hata:", error);
      Alert.alert("Hata", "Hayvan silinirken bir sorun oluştu.");
    }
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <View style={{ flex: 1, padding: 20 ,backgroundColor: "#f0f4f7", marginTop:33}}>
      <Text style={styles.title}>Profil Ekranı</Text>
      {currentUser ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.email}>Email: {currentUser.email}</Text>
          <Button  title="Çıkış Yap" onPress={handleSignOut} />
          <Text style={styles.subtitle}>Eklediğiniz Hayvanlar</Text>
          <FlatList
            data={userPets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>Adı: {item.name}</Text>
                <Text>Yaşı: {item.age}</Text>
                <Text>Cinsi: {item.breed}</Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Silme Onayı",
                      "Bu hayvanı silmek istediğinizden emin misiniz?",
                      [
                        { text: "İptal", style: "cancel" },
                        { text: "Sil", onPress: () => handleDeletePet(item.id) },
                      ]
                    )
                  }
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Sil</Text>
                </TouchableOpacity>
              </View>
            )}
            style={{ flex: 1 }} // FlatList için kaydırılabilir alan
          />
        </View>
      ) : (
        <Text>Lütfen giriş yapın!</Text>
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:'center'
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    textAlign:'center'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign:'center'
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF6F61",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
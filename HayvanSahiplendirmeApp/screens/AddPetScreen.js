//C:\Users\kilit\Desktop\deneme\HayvanSahiplendirmeApp\screens\AddPetScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { firestore, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AddPetScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');

  const handleAddPet = async () => {
    if (
      !name ||
      !age ||
      !breed ||
      !category ||
      !description ||
      !imageUrl ||
      !contactNumber ||
      !city
    ) {
      Alert.alert('Hata', 'Tüm alanları doldurun!');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        // Yeni belgeyi pets koleksiyonuna ekle
        const petDocRef = doc(firestore, 'pets', Date.now().toString());
        await setDoc(petDocRef, {
          name,
          age,
          breed,
          category,
          description,
          imageUrl,
          contactNumber,
          city,
          owner: user.uid,
          createdAt: new Date(),
        });

        Alert.alert('Başarılı', 'Hayvan başarıyla eklendi!');
        setName('');
        setAge('');
        setBreed('');
        setCategory('');
        setDescription('');
        setImageUrl('');
        setContactNumber('');
        setCity('');
      } else {
        Alert.alert('Hata', 'Lütfen giriş yapın!');
      }
    } catch (error) {
      console.error('Hayvan eklenirken hata:', error);
      Alert.alert('Hata', 'Hayvan eklenirken bir sorun oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Hayvan Ekle</Text>
      <TextInput
        style={styles.input}
        placeholder="Hayvan Adı"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Yaşı"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cinsi"
        value={breed}
        onChangeText={setBreed}
      />
      <TextInput
        style={styles.input}
        placeholder="Kategori (Örn: Köpek, Kedi)"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Fotoğraf URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="İletişim Numarası"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Şehir"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Ekle" onPress={handleAddPet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
    marginTop:33
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    height: 40,
  },
});

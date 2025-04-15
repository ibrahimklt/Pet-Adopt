//C:\Users\kilit\Desktop\deneme\HayvanSahiplendirmeApp\screens\PetDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PetDetailScreen = ({ route }) => {
  const { pet } = route.params; // pet parametresini alıyoruz

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.imageUrl }} style={styles.image} />
      <Text style={styles.text}>Yaşı: {pet.age}</Text>
      <Text style={styles.text}>Cinsi: {pet.breed}</Text>
      <Text style={styles.text}>Açıklama: {pet.description}</Text>
      <Text style={styles.text}>Şehir: {pet.city}</Text>
      <Text style={styles.text}>İletişim Numarası: {pet.contactNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
    marginTop:33
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  name: {
    fontSize: 24,
    textAlign:'center',
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
    textAlign:'center'
  },
});

export default PetDetailScreen;

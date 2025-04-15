//C:\Users\kilit\Desktop\deneme\HayvanSahiplendirmeApp\screens\HomeStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f4f7",
      padding: 10,
      marginTop:33
    },
    listContent: {
      paddingTop: 10,
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
      width:'100%',
      height:80
    },
    categoryButton: {
      paddingVertical: 12,
      backgroundColor: "#f8d362",
      borderRadius: 20,
      width: '24%',
      height:80,
      alignItems: "center",
      justifyContent:'center'
    },
    selectedCategory: {
      backgroundColor: "#FF6F61",
    },
    categoryText: {
      fontSize: 25,
      color: "#fff",
      fontWeight: "bold",
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 15,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 5,
    },
    text: {
      fontSize: 16,
      color: "#555",
    },
    favoriteButton: {
      backgroundColor: "#FF6F61",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginTop: 10,
      alignItems: "center",
    },
    favoriteButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  export default styles
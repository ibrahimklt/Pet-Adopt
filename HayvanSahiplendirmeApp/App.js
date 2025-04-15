//C:\Users\kilit\Desktop\deneme\HayvanSahiplendirmeApp\App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Tab bar için import
import { Ionicons } from 'react-native-vector-icons'; // İkonlar için import
import AuthScreen from "./screens/AuthScreen";
import HomeScreen from "./screens/HomeScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import PetDetailScreen from "./screens/PetDetailScreen";
import ProfileScreen from "./screens/ProfileScreen ";
import AddPetScreen from "./screens/AddPetScreen"
import { auth } from "./firebase";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Tab Navigator'ı oluşturduk

// Tab Navigator'ı bir Screen olarak Stack içinde tanımlıyoruz
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
          headerShown:false
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          tabBarIcon: () => <Ionicons name="heart" size={24} color="black" />,
          headerShown:false
        }} 
      />
      <Tab.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{
          tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" />,
          headerShown:false
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: () => <Ionicons name="person" size={24} color="black" />,
          headerShown:false
        }} 
      />
    </Tab.Navigator>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Tab bar ekranını burada Stack içinde kullanıyoruz
          <Stack.Screen 
            name="HomeTabs" 
            component={TabNavigator} 
            options={{ headerShown: false }} // TabNavigator'ın header'ını gizliyoruz
          />
        ) : (
          // Giriş ekranı
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
        <Stack.Screen name="PetDetails" component={PetDetailScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
/*import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Toast from 'react-native-toast-message';

import Login from './app/screens/Login';
import SignUp from './app/screens/signUp';
import List from './app/screens/List';
import Profile from './app/screens/Profile';
import Activity from './app/screens/Activity';
import Leaderboard from './app/screens/Leaderboard';
import Details from './app/screens/Details';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
            console.log('User state changed:', authUser);
            setUser(authUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return null;
    }

    const TabNavigator = () => (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={List} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Activity" component={Activity} />
            <Tab.Screen name="Leaderboard" component={Leaderboard} />
        </Tab.Navigator>
    );

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={user ? 'TabNavigator' : 'Login'}>
                    {user ? (
                        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                        </>
                    )}
                    <Stack.Screen name="Details" component={Details} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast />
        </>
    );
}*/






import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig"; // Ensure correct Firebase import
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";

// ✅ Import Screens (Ensure Correct Paths)
import Login from "./app/screens/Login";
import SignUp from "./app/screens/signUp";
import List from "./app/screens/List";
import Profile from "./app/screens/Profile";
import Activity from "./app/screens/Activity";
import Leaderboard from "./app/screens/Leaderboard";
import Details from "./app/screens/Details";

// ✅ Create Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Tab Navigation Setup
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case "Home":
            iconName = "home-outline";
            break;
          case "Profile":
            iconName = "person-outline";
            break;
          case "Activity":
            iconName = "fitness-outline";
            break;
          case "Leaderboard":
            iconName = "trophy-outline";
            break;
          default:
            iconName = "ellipse-outline";
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#4CAF50", // Green for active tab
      tabBarInactiveTintColor: "gray", // Gray for inactive tab
      tabBarStyle: {
        backgroundColor: "#1E1E2C",
        borderTopWidth: 0,
        elevation: 10,
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
    })}
  >
    <Tab.Screen name="Home" component={List} options={{ tabBarLabel: "Home" }} />
    <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: "Profile" }} />
    <Tab.Screen name="Activity" component={Activity} options={{ tabBarLabel: "Activity" }} />
    <Tab.Screen name="Leaderboard" component={Leaderboard} options={{ tabBarLabel: "Leaderboard" }} />
  </Tab.Navigator>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log("User state changed:", authUser);
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
          <Stack.Screen name="Details" component={Details} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E2C",
  },
});

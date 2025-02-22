import React, { useState, useEffect, useRef } from "react";
import { ResizeMode } from "expo-av"; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const videoRef = useRef<Video>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      await signOut(FIREBASE_AUTH);
      Toast.show({
        type: "success",
        text1: "Account Created!",
        text2: "Please log in to continue.",
      });
      navigation.navigate("Login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Sign-up Failed",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        ref={videoRef}
        source={require("../../assets/we-are-cult-web.mp4")}
        style={styles.backgroundVideo}
        shouldPlay
        isLooping
        resizeMode={ResizeMode.CONTAIN}  
        isMuted={true}
      />

      {/* Gradient Overlay */}
      <LinearGradient colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)"]} style={styles.overlay} />

      {/* Sign-Up Form */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Join the Fitness Journey!</Text>

            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={signUp} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>

            {/* Already have an account? */}
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginLink}>
              <Text style={styles.loginText}>Already have an account? Log in!</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  backgroundVideo: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  innerContainer: {
    width: "80%", // Reduced size
    backgroundColor: "transparent", // Removed background box
    padding: 10, // Reduced padding
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22, // Slightly smaller title
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 40, // Reduced size
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent input fields
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    width: "100%",
    height: 40, // Reduced size
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 15,
    alignItems: "center",
  },
  loginText: {
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SignUp;

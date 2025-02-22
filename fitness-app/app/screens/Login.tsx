import React, { useState, useEffect, useRef } from "react";
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
import { ResizeMode } from "expo-av";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password",
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Toast.show({
        type: "success",
        text1: "Login Successful",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
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
        resizeMode={ResizeMode.COVER}
        isMuted={true}
      />

      {/* Gradient Overlay */}
      <LinearGradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.9)"]} style={styles.overlay} />

      {/* Motivational Text */}
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}>
        <Text style={styles.motivationText}>Sweat. Smile. Repeat.</Text>
        <Text style={styles.letsGoText}>Let's Go!</Text>
      </Animated.View>

      {/* Login Form */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signupLink}>
              <Text style={styles.signupText}>Don't have an account? Sign up here!</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast />
    </View>
  );
}

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
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    position: "absolute",
    top: "15%",
    alignSelf: "center",
    alignItems: "center",
  },
  motivationText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  letsGoText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#FF4B2B",
    textTransform: "uppercase",
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
    width: "85%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 42,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 10,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  button: {
    width: "80%",
    height: 45,
    backgroundColor: "#FF416C",
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
  signupLink: {
    marginTop: 15,
    alignItems: "center",
  },
  signupText: {
    color: "#ffab91",
    fontSize: 14,
    fontWeight: "500",
  },
});



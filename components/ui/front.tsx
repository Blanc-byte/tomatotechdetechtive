import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated } from "react-native";
import SignUpModal from "../auth/signup";
import LogInModal from "../auth/login"; 

export default function FrontPage() {
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState<boolean>(false);
  const [isLogInModalVisible, setIsLogInModalVisible] = useState<boolean>(false);

  // Animated values for modal transitions
  const signUpOpacity = useState(new Animated.Value(0))[0];
  const loginOpacity = useState(new Animated.Value(0))[0];

  // Function to handle animation for showing modals
  const animateModal = (modalType: "signUp" | "logIn", isVisible: boolean) => {
    const opacityValue = isVisible ? 1 : 0;
    const targetOpacity = modalType === "signUp" ? signUpOpacity : loginOpacity;

    Animated.timing(targetOpacity, {
      toValue: opacityValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Trigger animations on modal visibility changes
  useEffect(() => {
    animateModal("signUp", isSignUpModalVisible);
  }, [isSignUpModalVisible]);

  useEffect(() => {
    animateModal("logIn", isLogInModalVisible);
  }, [isLogInModalVisible]);

  const handleGetStarted = () => {
    setIsLogInModalVisible(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpModalVisible(false);
    setIsLogInModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Tomato Leaf Detectives</Text>
      <Text style={styles.description}>
        Empowering farmers with AI-driven solutions to detect and prevent
        diseases in tomato plants.
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={handleGetStarted}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Sign Up Modal with animation */}
      {isSignUpModalVisible && (
        <Animated.View style={[styles.modal, { opacity: signUpOpacity }]}>
          <SignUpModal
            visible={isSignUpModalVisible}
            onClose={() => setIsSignUpModalVisible(false)}
            onLogInPress={handleSwitchToLogin}
          />
        </Animated.View>
      )}

      {/* Log In Modal with animation */}
      {isLogInModalVisible && (
        <Animated.View style={[styles.modal, { opacity: loginOpacity }]}>
          <LogInModal
            visible={isLogInModalVisible}
            onClose={() => setIsLogInModalVisible(false)}
            onSignUpPress={() => {
              setIsLogInModalVisible(false);
              setIsSignUpModalVisible(true);
            }}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "cover",
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0066CC",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#28A745", 
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

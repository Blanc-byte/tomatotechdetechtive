import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { User, supabase } from "@/lib/User";

interface LogInModalProps {
  visible: boolean;
  onClose: () => void;
  onSignUpPress: () => void; // This function will handle switching to the SignUpModal
  onLoginSuccess: (user: User) => void;
}

export default function LogInModal({ visible, onClose, onSignUpPress, onLoginSuccess }: LogInModalProps) {
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    // Check if user exists in Supabase
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !data) {
      Alert.alert("Not Found", "No account found for this email. Please sign up.");
      return;
    }
    // User found, log in
    const user: User = {
      id: data.id,
      Fname: data.Fname,
      Lname: data.Lname,
      email: data.email,
      Location: data.Location,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
    Alert.alert("Success", "Logged In!");
    onLoginSuccess(user);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Log In</Text>

          {/* Login Form */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSignUpPress} style={styles.switchButton}>
            <Text>Don't have an account? <Text style={styles.switchButtonText}>Sign Up</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#0066CC",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#0066CC",
    fontSize: 14,
  },
  switchButton: {
    alignItems: "center",
    marginTop: 10,
  },
  switchButtonText: {
    color: "#28A745",
    fontSize: 14,
  },
});

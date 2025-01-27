import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

interface SignUpModalProps {
  visible: boolean;
  onClose: () => void;
  onLogInPress: () => void;
}

interface FormState {
  firstname: string;
  lastname: string;
  company: string;
  gmail: string;
  password: string; // Add password field
}

export default function SignUpModal({ visible, onClose, onLogInPress }: SignUpModalProps) {
  const [form, setForm] = useState<FormState>({
    firstname: "",
    lastname: "",
    company: "",
    gmail: "",
    password: "", // Initialize password
  });

  const handleChange = (name: keyof FormState, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = () => {
    const { firstname, lastname, gmail, password } = form;

    // Validate fields
    if (!firstname || !lastname || !gmail || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      Alert.alert("Error", "Please enter a valid Gmail address.");
      return;
    }

    // Password validation (minimum 6 characters for example) ug umaabutay 
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    // Success message
    Alert.alert("Success", `Welcome, ${firstname}! Your account has been created.`);
    onClose();
    setForm({ firstname: "", lastname: "", company: "", gmail: "", password: "" });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={form.firstname}
            onChangeText={(text) => handleChange("firstname", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={form.lastname}
            onChangeText={(text) => handleChange("lastname", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Company"
            value={form.company}
            onChangeText={(text) => handleChange("company", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Gmail"
            keyboardType="email-address"
            value={form.gmail}
            onChangeText={(text) => handleChange("gmail", text)}
          />

          {/* Password field */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true} // Mask the password
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onLogInPress} style={styles.switchButton}>
            <Text>Already have an account? <Text style={styles.switchButtonText}>Log In</Text></Text>
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

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
import { User, supabase } from "@/lib/User";

interface SignUpModalProps {
  visible: boolean;
  onClose: () => void;
  onLogInPress: () => void;
  onSignUpSuccess: (user: User) => void;
}

interface FormState {
  firstname: string;
  lastname: string;
  gmail: string;
  location: string;
}

export default function SignUpModal({ visible, onClose, onLogInPress, onSignUpSuccess }: SignUpModalProps) {
  const [form, setForm] = useState<FormState>({
    firstname: "",
    lastname: "",
    gmail: "",
    location: "",
  });

  const handleChange = (name: keyof FormState, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = async () => {
    const { firstname, lastname, gmail, location } = form;

    // Validate fields
    if (!firstname || !lastname || !gmail || !location) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      Alert.alert("Error", "Please enter a valid Gmail address.");
      return;
    }

    // Create user object
    const user: User = {
      id: Date.now().toString(),
      Fname: firstname,
      Lname: lastname,
      email: gmail,
      location: location,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert into Supabase Users table
    const { error } = await supabase
      .from('Users')
      .insert([{ id: user.id, Fname: user.Fname, Lname: user.Lname, email: user.email, location: user.location, createdAt: user.createdAt, updatedAt: user.updatedAt }]);
    if (error) {
      Alert.alert("Error", "Failed to sign up: " + error.message);
      return;
    }

    Alert.alert("Success", `Welcome, ${firstname}! Your account has been created.`);
    onSignUpSuccess(user);
    onClose();
    setForm({ firstname: "", lastname: "", gmail: "", location: "" });
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
            placeholder="Gmail"
            keyboardType="email-address"
            value={form.gmail}
            onChangeText={(text) => handleChange("gmail", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={form.location}
            onChangeText={(text) => handleChange("location", text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onLogInPress} style={styles.switchButton}>
            <Text>Already have an account? <Text style={styles.switchButtonText}>Log In</Text></Text>
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

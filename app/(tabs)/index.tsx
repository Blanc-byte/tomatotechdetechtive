import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTfliteModel } from "@/hooks/useTfliteModel";
import { loadTensorflowModel } from "react-native-fast-tflite";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { AntDesign } from "@expo/vector-icons"; // For the camera icon
import { plantDiseaseClasses } from "@/assets/model/modelCLasses";
export default function HomeScreen() {
  const [isTfReady, setIsTfReady] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Initializing...");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setModel, runModelPrediction, classification, confidence } =
    useTfliteModel();

  // Ensure TensorFlow is ready before classifying
  useEffect(() => {
    const initializeTf = async () => {
      setIsTfReady(true);
      await loadModel();
    };
    initializeTf();
  }, []);

  const loadModel = async () => {
    const tfliteModel = await loadTensorflowModel(
      require("@/assets/model/model.tflite")
    );
    setModel(tfliteModel);
  };

  // Handle Image Selection
  const handleImageSelection = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!pickerResult.canceled) {
      processImage(pickerResult.assets[0].uri);
    }
  };

  // Handle Image Capture
  const handleImageCapture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the camera is required!");
      return;
    }

    const cameraResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!cameraResult.canceled) {
      processImage(cameraResult.assets[0].uri);
    }
  };

  // Process Image
  const processImage = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 200, height: 200 } }],
        { format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );
      setSelectedImage(manipulatedImage.uri);
      setIsModalVisible(true);
      runModelPrediction(manipulatedImage.uri, "float32", plantDiseaseClasses); // Replace {} with actual classes
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {!isTfReady ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.status}>{loadStatus}</Text>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleImageSelection()}
          >
            <AntDesign name="picture" size={24} color="white" />
            <Text style={styles.buttonText}>Select Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleImageCapture()}
          >
            <AntDesign name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Capture Image</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Loading Screen */}
      {isProcessing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Processing Image...</Text>
        </View>
      )}

      {/* Modal for Result */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            )}
            <Text style={styles.resultText}>
              Classification: {classification || "N/A"}
            </Text>
            <Text style={styles.resultText}>
              Confidence: {confidence ? `${confidence}%` : "N/A"}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#E57373",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

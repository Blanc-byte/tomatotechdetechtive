import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useTfliteModel } from "@/hooks/useTfliteModel";
import { loadTensorflowModel } from "react-native-fast-tflite";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { AntDesign } from "@expo/vector-icons"; 
import { plantDiseaseClasses } from "@/assets/model/updatedModel/classes";
import FrontPage from "@/components/ui/front";
import { saveClassifiedImage } from "@/lib/imageUtil";

export default function HomeScreen() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    confidence,
    setConfidence,
    classification,
    setClassification,
    isModelPredicting,
    setIsModelPredicting,
    model,
    setModel,
    runModelPrediction,
  } = useTfliteModel();
  
  const [isTfReady, setIsTfReady] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Initializing...");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");
  
  useEffect(() => {
    const initializeTf = async () => {
      setIsTfReady(true);
      await loadModel();
    };
    initializeTf();
  }, []);

  const loadModel = async () => {
    const tfliteModel = await loadTensorflowModel(
      require("@/assets/model/updatedModel/efficientnetv2b2_model.tflite")
    );
    setModel(tfliteModel);
  };

  const openCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Camera access denied. Please allow access to use this feature.");
        return;
      }
      
      const cameraOptions = { mediaTypes: ImagePicker.MediaTypeOptions.Images };
      
      const result = await ImagePicker.launchCameraAsync(cameraOptions);
      if (!result.canceled) {
        
        processImage(result.assets[0].uri);
      } else {
        console.log("User canceled camera.");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };
  

  const openGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Media library access denied. Please allow access to use this feature.");
        return;
      }
      
      const galleryOptions = { mediaTypes: ImagePicker.MediaTypeOptions.Images };
      
      const result = await ImagePicker.launchImageLibraryAsync(galleryOptions);
      if (!result.canceled) {
        
        processImage(result.assets[0].uri);
      } else {
        console.log("User canceled gallery.");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };
  

  const processImage = async (imageUri: string) => {
    setIsProcessing(true);
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 224, height: 224 }}],
        { format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );
      setSelectedImage(manipulatedImage.uri);
      setIsModalVisible(true);
      runModelPrediction(manipulatedImage.uri, "float32", plantDiseaseClasses);
      
      setImageUri(manipulatedImage.uri);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <FrontPage />
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            )}

            {isModelPredicting ? (
              <>
                <Text style={styles.resultText}>Disease: {classification}</Text>
                <ActivityIndicator size="large" color="#0000ff" />
              
              </>
            ) : (
              <>
                {classification && confidence !== null && (
                  <>
                    <Text style={styles.resultText}>Disease: {classification}</Text>
                    <Text style={styles.resultText}>Accuracy: {confidence}%</Text>
                    {(() => {
                      saveClassifiedImage(imageUri, classification, confidence).catch((error) =>
                        console.error("Error saving classified image:", error)
                      );
                      return null;
                    })()}
                  </>
                )}
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {setIsModalVisible(false);
                setClassification(null);
                setConfidence(null);
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsOptionsVisible(!isOptionsVisible)}
      >
        <AntDesign name="plus" size={28} color="#fff" />
      </TouchableOpacity>

      {isOptionsVisible && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
            <AntDesign name="camera" size={28} color="#fff" />
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={openGallery}>
            <AntDesign name="folder1" size={28} color="#fff" />
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 18,
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
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 100,
    right: 30,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  optionButton: {
    backgroundColor: "#4CAF50",
    width: 80,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
});

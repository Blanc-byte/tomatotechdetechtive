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
  Pressable,
  ScrollView,  // Import ScrollView
} from "react-native";
import { useTfliteModel } from "@/hooks/useTfliteModel";
import { loadTensorflowModel } from "react-native-fast-tflite";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { AntDesign } from "@expo/vector-icons"; 
import { plantDiseaseClasses } from "@/assets/model/ClassesAndDescription/classes";
import { plantDiseaseClassesDescription } from "@/assets/model/ClassesAndDescription/diseaseDescription";
import { plantPreventionAndStrat } from "@/assets/model/ClassesAndDescription/preventionsAndStrategies";
import FrontPage from "@/components/ui/front";
import { saveClassifiedImage } from "@/lib/imageUtil";
import BacterialSpot from "@/components/prescriptions/BacterialSpot";
import TomatoEarlyBlight from "@/components/prescriptions/TomatoEarlyBlight";
import LateBlight from "@/components/prescriptions/LateBlight";
import LeafMold from "@/components/prescriptions/LeafMold";
import MosaicVirus from "@/components/prescriptions/MosaicVirus";
import SeptoriaLeafSpot from "@/components/prescriptions/SeptoriaLeafSpot";
import SpiderMites from "@/components/prescriptions/SpiderMites";
import TargetSpot from "@/components/prescriptions/TargetSpot";
import TomatoYellowCurlVirus from "@/components/prescriptions/TomatoYellowCurlVirus";

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
    description,
    index,
  } = useTfliteModel();

  const [isTfReady, setIsTfReady] = useState(false);
  const [loadStatus, setLoadStatus] = useState("Initializing...");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [hasSaved, setHasSaved] = useState(true);

  useEffect(() => {
    const initializeTf = async () => {
      setIsTfReady(true);
      await loadModel();
    };
    initializeTf();
  }, []);

  const loadModel = async () => {
    const tfliteModel = await loadTensorflowModel(
      require("@/assets/model/may7UpdatedModel/efficientnetv2b2_model.tflite")
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
      runModelPrediction(manipulatedImage.uri, "float32", plantDiseaseClasses, plantDiseaseClassesDescription);
      setImageUri(manipulatedImage.uri);
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const [showDescription, setShowDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <FrontPage />
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
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
                      <Text style={styles.resultText}>{classification}</Text>
                      {confidence > 90 && (
                        <View style={{ marginTop: 10 }}>
                          
                          <Pressable onPress={() => setShowModal(!showModal)}>
                            <Text style={styles.dropdownToggle}>
                              Show Presciption {showModal}?
                            </Text>
                          </Pressable>

                          <Pressable onPress={() => setShowDescription(!showDescription)}>
                            <Text style={styles.dropdownToggle}>
                              What is {classification}? {showDescription ? '▲' : '▼'}
                            </Text>
                          </Pressable>
                          

                          {showDescription && (
                            <Text>{description}</Text>
                          )}

                          {index === "0" && showModal && (
                            <BacterialSpot visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "1" && showModal && (
                            <TomatoEarlyBlight visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "3" && showModal && (
                            <LateBlight visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "4" && showModal && (
                            <LeafMold visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "5" && showModal && (
                            <MosaicVirus visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "6" && showModal && (
                            <SeptoriaLeafSpot visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "7" && showModal && (
                            <SpiderMites visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "8" && showModal && (
                            <TargetSpot visible={true} onClose={() => setShowModal(false)} />
                          )}
                          {index === "9" && showModal && (
                            <TomatoYellowCurlVirus visible={true} onClose={() => setShowModal(false)} />
                          )}

                        </View>
                      )}
                      {(() => {
                        if(hasSaved && confidence > 90){
                          saveClassifiedImage(imageUri, classification, confidence).catch((error) =>
                            console.error("Error saving classified image:", error)
                          );
                          setHasSaved(false);
                          return null;
                        }
                      })()}
                    </>
                  )}
                </>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setIsModalVisible(false);
                  setClassification(null);
                  setConfidence(null);
                  setIsModalVisible(false);
                  setHasSaved(true);
                  setShowDescription(false);
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
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
    padding: 23,
    borderRadius: 10,
    justifyContent: "flex-start",
    width: 400,
    maxHeight: 780,
  },
  scrollContent: {
    paddingBottom: 20,  // Add bottom padding if needed
  },
  image: {
    width: 350,
    height: 350,
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
    marginTop: 20,
    alignItems: "center",
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
  dropdownToggle: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop:5,
  },
  diseaseDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#444',
  },
});

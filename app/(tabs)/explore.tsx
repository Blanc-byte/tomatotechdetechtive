import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useIsFocused } from "@react-navigation/native";
import DiseaseGalleryModal from "../components/DiseaseGalleryModal";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabTwoScreen() {
  const [imagesData, setImagesData] = useState<{ uri: string; diseaseClass: string; confidence: string }[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const isFocused = useIsFocused(); 
  const [ClassDisease, setClassDisease] = useState<{ uri: string; diseaseClass: string; confidence: string }[]>([]);
  const diseaseSet = React.useRef(new Set()); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [galleryVisible, setGalleryVisible] = useState(false);

  const handleDeleteImage = async () => {
    if (selectedImage) {
      try {
        await FileSystem.deleteAsync(selectedImage);
        setImagesData((prev) =>
          prev.filter((image) => image.uri !== selectedImage)
        );
        Alert.alert("Success", "Image deleted successfully");
      } catch (error) {
        console.error("Error deleting image:", error);
        Alert.alert("Error", "Failed to delete the image");
      } finally {
        setModalVisible(false);
        setSelectedImage(null);
      }
    }
  };

  // Function to delete all images from local storage
  const handleDeleteAllImages = async () => {
    try {
      const imagesDirectory = FileSystem.documentDirectory + "images/";

      const directories = await FileSystem.readDirectoryAsync(imagesDirectory);

      // Loop through each directory (i.e., disease class) and delete the files
      for (let dir of directories) {
        const classDirectory = imagesDirectory + dir;
        const files = await FileSystem.readDirectoryAsync(classDirectory);
        // Only include image files
        const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));
        if (imageFiles.length === 0) {
          await FileSystem.deleteAsync(classDirectory);
          console.log(`Deleted empty folder: ${classDirectory}`);
          continue;
        }
        // Delete each file in the directory
        for (let file of imageFiles) {
          const filePath = classDirectory + "/" + file;
          await FileSystem.deleteAsync(filePath);
        }

        // Finally, delete the empty directory
        await FileSystem.deleteAsync(classDirectory);
        console.log(`Deleted directory: ${classDirectory}`);
      }

      // Update the state after deletion
      setImagesData([]);
      setClassDisease([]);
      Alert.alert("Success", "All images deleted successfully");
    } catch (error) {
      console.error("Error deleting all images:", error);
      Alert.alert("Error", "Failed to delete all images");
    }
  };

  const handleDeleteAllImagesConfirm = () => {
    Alert.alert(
      'Delete All Images',
      'Are you sure you want to delete all images? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDeleteAllImages },
      ]
    );
  };

  // Move loadImagesOnFocus to top-level so it can be called from onDelete
  const loadImagesOnFocus = async () => {
    try {
      const imagesDir = FileSystem.documentDirectory + 'images/';

      async function ensureImagesDirExists() {
        const dirInfo = await FileSystem.getInfoAsync(imagesDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(imagesDir, { intermediates: true });
        }
      }

      await ensureImagesDirExists();
      const images = await FileSystem.readDirectoryAsync(imagesDir);

      const parsedData: { uri: string; diseaseClass: string; confidence: string }[] = [];
      diseaseSet.current = new Set(); // Reset diseaseSet to avoid duplicates
      setClassDisease([]); // Reset ClassDisease

      for (let dir of images) {
        const classDirectory = imagesDir + dir;
        const files = await FileSystem.readDirectoryAsync(classDirectory);
        // Only include image files
        const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));
        if (imageFiles.length === 0) {
          await FileSystem.deleteAsync(classDirectory);
          console.log(`Deleted empty folder: ${classDirectory}`);
          continue;
        }
        for (let fileName of imageFiles) {
          const diseaseClass = dir;
          const fileSplit = fileName.split(".")[0];
          const confidenceWithExt = fileSplit.split("-")[0];
          const confidence = confidenceWithExt.replace("_", ".");
          if (!diseaseSet.current.has(diseaseClass)) {
            diseaseSet.current.add(diseaseClass);
            setClassDisease((prev) => [
              ...prev,
              {
                uri: classDirectory + "/" + fileName,
                diseaseClass: diseaseClass || "Unknown",
                confidence: confidence || "N/A",
              },
            ]);
          }
          parsedData.push({
            uri: classDirectory + "/" + fileName,
            diseaseClass: diseaseClass || "Unknown",
            confidence: confidence || "N/A",
          });
        }
      }

      setImagesData(parsedData);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadImagesOnFocus();
    }
  }, [isFocused]);

  const renderItem = ({ item }: { item: { uri: string; diseaseClass: string; confidence: string } }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            setSelectedFeature(item.diseaseClass);
            setGalleryVisible(true);
          }}
        >
          <Text style={styles.diseaseClass}>{`${item.diseaseClass}`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderImages = ({ item }: { item: { uri: string; diseaseClass: string; confidence: string } }) => (
    <TouchableOpacity
      onLongPress={() => {
        setSelectedImage(item.uri);
        setModalVisible(true);
      }}
      style={styles.imageWrapper}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.confidenceText}>{`${item.confidence}%`}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    
      <FlatList
        data={ClassDisease}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={[styles.flatList, { backgroundColor: '#eaffea' }]}
      />
      <View style={[styles.fabContainer]}>
        <TouchableOpacity style={styles.fab} onPress={handleDeleteAllImagesConfirm}>
          <MaterialIcons name="delete-forever" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this image?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                onPress={() => {
                  setModalVisible(false);
                  setSelectedImage(null);
                }}
              />
              <Button
                title="Delete"
                color="red"
                onPress={handleDeleteImage}
              />
            </View>
          </View>
        </View>
      </Modal>
      {galleryVisible && selectedFeature && (
        <DiseaseGalleryModal
          visible={galleryVisible}
          onClose={() => setGalleryVisible(false)}
          images={imagesData.filter(img => img.diseaseClass === selectedFeature)}
          diseaseName={selectedFeature}
          onDelete={() => {
            setGalleryVisible(false);
            setTimeout(() => {
              loadImagesOnFocus();
            }, 300);
          }}
        />
      )}

    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#eaffea",
    paddingTop: 100,
  },
  imageContainer: {
    backgroundColor: '#e8f5e9',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 14,
    marginHorizontal: 8,
    shadowColor: '#43a047',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diseaseClass: {
    fontSize: 20,
    fontWeight: '600',
    color: '#256029',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
  imagesList: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(240, 240, 240, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  confidenceText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    backgroundColor: "#e0f7fa",
    padding: 6,
    borderRadius: 6,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 10,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 100,
  },
  fab: {
    backgroundColor: '#E57373',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});

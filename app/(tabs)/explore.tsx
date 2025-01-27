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

export default function TabTwoScreen() {
  const [imagesData, setImagesData] = useState<{ uri: string; diseaseClass: string; confidence: string }[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const isFocused = useIsFocused(); 
  const [ClassDisease, setClassDisease] = useState<{ uri: string; diseaseClass: string; confidence: string }[]>([]);
  const diseaseSet = React.useRef(new Set()); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  useEffect(() => {
    const loadImagesOnFocus = async () => {
      try {
        const imagesDirectory = FileSystem.documentDirectory + "images/";
        const directories = await FileSystem.readDirectoryAsync(imagesDirectory);

        const parsedData: { uri: string; diseaseClass: string; confidence: string }[] = [];

        for (let dir of directories) {
          const classDirectory = imagesDirectory + dir;

          const files = await FileSystem.readDirectoryAsync(classDirectory);
          
          if (files.length === 0) {
            await FileSystem.deleteAsync(classDirectory);
            console.log(`Deleted empty folder: ${classDirectory}`);
            continue; 
          }

          for (let fileName of files) {
            const diseaseClass = dir;
            //console.log("diseaseClass: "+ diseaseClass);
            const fileSplit = fileName.split(".")[0];
            //console.log("fileSplit: "+ fileSplit);
            const confidenceWithExt = fileSplit.split("-")[0];
            //console.log("confidenceWithExt: "+ confidenceWithExt);
            const confidence = confidenceWithExt.replace("_", ".");
            //console.log("confidence: "+ diseaseClass);

            // Check if diseaseClass is already in the Set
            if (!diseaseSet.current.has(diseaseClass)) {
              diseaseSet.current.add(diseaseClass); // Add to the Set
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

    if (isFocused) {
      loadImagesOnFocus();
    }
  }, [isFocused]);

  const renderItem = ({ item }: { item: { uri: string; diseaseClass: string; confidence: string } }) => {
    const isExpanded = expandedItems.has(item.diseaseClass);

    return (
      <View>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => {
            const newExpandedItems = new Set(expandedItems);
            if (newExpandedItems.has(item.diseaseClass)) {
              newExpandedItems.delete(item.diseaseClass);
            } else {
              newExpandedItems.add(item.diseaseClass);
            }
            setExpandedItems(newExpandedItems);
          }}
        >
          <Text style={styles.diseaseClass}>{`${item.diseaseClass}`}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <FlatList
            data={imagesData.filter((img) => img.diseaseClass === item.diseaseClass)}
            keyExtractor={(imageItem, index) => index.toString()}
            renderItem={renderImages}
            style={styles.imagesList}
            horizontal
          />
        )}
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
        style={styles.flatList}
      />
      
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
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
    paddingTop: 100,
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
  },
  diseaseClass: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    padding: 12,
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
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
});

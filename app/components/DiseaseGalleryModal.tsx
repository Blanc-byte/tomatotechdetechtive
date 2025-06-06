import React, { useState } from "react";
import { Modal, View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';

type Props = {
  visible: boolean;
  onClose: () => void;
  images: { uri: string; diseaseClass: string; confidence: string }[];
  diseaseName: string;
  onDelete?: () => void;
};

// Improved helper to extract date from filename
function extractDateFromUri(uri: string): string {
  // Get the filename
  const filename = uri.split('/').pop() || '';
  // Example: 95_23-2024_06_08_13_45_12_123Z-1.jpg
  const parts = filename.split('-');
  if (parts.length >= 2) {
    const timestamp = parts[1]; // 2024_06_08_13_45_12_123Z
    // Remove trailing Z or any non-numeric/underscore
    const cleanTimestamp = timestamp.replace(/[^0-9_]/g, '');
    const [year, month, day, hour, min, sec, ms] = cleanTimestamp.split('_');
    if (year && month && day && hour && min && sec) {
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }
    return timestamp; // fallback: show raw timestamp
  }
  return '';
}

const DiseaseGalleryModal: React.FC<Props> = ({ visible, onClose, images, diseaseName, onDelete }) => {
  const [prescriptionModalVisible, setPrescriptionModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | { uri: string; diseaseClass: string; confidence: string }>(null);
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState(images);

  // When images prop changes, update galleryImages
  React.useEffect(() => {
    setGalleryImages(images);
  }, [images]);

  // Helper to get JSON path for an image (robust for .jpg, .jpeg, .png, strips query params/fragments)
  function getJsonPathForImage(imageUri: string) {
    let cleanUri = imageUri.split('?')[0].split('#')[0];
    const fileName = cleanUri.split('/').pop() || '';
    const jsonName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.json');
    return cleanUri.replace(fileName, jsonName);
  }

  // On long press, load prescription and show modal
  const handleLongPress = async (img: { uri: string; diseaseClass: string; confidence: string }) => {
    setSelectedImage(img);
    setPrescription('');
    setLoading(true);
    try {
      const jsonPath = getJsonPathForImage(img.uri);
      console.log('Looking for JSON at:', jsonPath);
      const info = await FileSystem.getInfoAsync(jsonPath);
      console.log('JSON file exists:', info.exists);
      if (info.exists) {
        const jsonStr = await FileSystem.readAsStringAsync(jsonPath);
        const meta = JSON.parse(jsonStr);
        console.log('Loaded JSON:', meta);
        if (meta && (typeof meta.prescriptions !== 'undefined' || typeof meta.prescription !== 'undefined')) {
          setPrescription(meta.prescriptions || meta.prescription || '(No prescription)');
        } else {
          setPrescription('(Prescription field missing in metadata)');
        }
      } else {
        setPrescription('(No prescription metadata found)');
      }
    } catch (e) {
      setPrescription('(Error loading prescription)');
      console.log('Error loading prescription:', e);
    }
    setLoading(false);
    setPrescriptionModalVisible(true);
  };

  // Delete image and its JSON
  const handleDelete = async () => {
    if (!selectedImage) return;
    const imgUri = selectedImage.uri;
    const jsonPath = getJsonPathForImage(imgUri);
    const dirPath = imgUri.substring(0, imgUri.lastIndexOf('/'));

    try {
      console.log('Attempting to delete image:', imgUri);
      await FileSystem.deleteAsync(imgUri, { idempotent: true });
      const imageInfo = await FileSystem.getInfoAsync(imgUri);
      console.log('Image exists after delete?', imageInfo.exists);
    } catch (e) {
      console.log('Error deleting image:', e);
    }
    try {
      await FileSystem.deleteAsync(jsonPath, { idempotent: true });
    } catch (e) {
      console.log('Error deleting JSON:', e);
    }
    try {
      // Check if directory is empty, then delete it
      const files = await FileSystem.readDirectoryAsync(dirPath);
      if (files.length === 0) {
        await FileSystem.deleteAsync(dirPath, { idempotent: true });
        console.log('Deleted empty directory:', dirPath);
      }
    } catch (e) {
      console.log('Error checking/deleting directory:', e);
    }
    setGalleryImages(galleryImages.filter(img => img.uri !== imgUri));
    setPrescriptionModalVisible(false);
    setSelectedImage(null);
    if (onDelete) onDelete();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>{diseaseName}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.gallery}>
          {galleryImages.map((img) => (
            <TouchableOpacity
              key={img.uri}
              style={styles.imageWrapper}
              onLongPress={() => handleLongPress(img)}
              delayLongPress={300}
            >
              <Image source={{ uri: img.uri }} style={styles.image} />
              <Text style={styles.confidence}>{img.confidence}%</Text>
              <Text style={styles.date}>{extractDateFromUri(img.uri)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Prescription Modal */}
        <Modal
          visible={prescriptionModalVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setPrescriptionModalVisible(false)}
        >
          <View style={styles.prescriptionOverlay}>
            <View style={styles.prescriptionModal}>
              <Text style={styles.prescriptionTitle}>Prescription</Text>
              {loading ? (
                <Text style={styles.prescriptionText}>Loading...</Text>
              ) : (
                <ScrollView style={styles.prescriptionScroll} contentContainerStyle={{paddingBottom: 12}} showsVerticalScrollIndicator={true}>
                  <Text style={styles.prescriptionText}>{prescription}</Text>
                </ScrollView>
              )}
              <View style={styles.prescriptionButtons}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                  <MaterialIcons name="delete" size={22} color="#fff" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButtonModal} onPress={() => setPrescriptionModalVisible(false)}>
                  <MaterialIcons name="close" size={22} color="#fff" />
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#181A2A" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D3250",
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: { marginRight: 16 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 12,
  },
  imageWrapper: {
    margin: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    borderColor: "#43a047",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 150,
  },
  image: { width: 140, height: 140, borderRadius: 10 },
  confidence: { color: "#256029", marginTop: 6, fontWeight: "bold", fontSize: 16 },
  date: { color: "#888", fontSize: 13, marginTop: 2, fontStyle: 'italic' },
  prescriptionOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prescriptionModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  prescriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#256029',
    marginBottom: 12,
  },
  prescriptionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  prescriptionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E57373',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  closeButtonModal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#43a047',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
  prescriptionScroll: {
    width: '100%',
    maxHeight: 260,
    marginBottom: 18,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default DiseaseGalleryModal; 
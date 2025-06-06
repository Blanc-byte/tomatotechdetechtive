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
  ScrollView,
  TextInput,
  Button,  // Import ScrollView
} from "react-native";
import { useTfliteModel } from "@/hooks/useTfliteModel";
import { loadTensorflowModel } from "react-native-fast-tflite";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { AntDesign } from "@expo/vector-icons"; 
import { plantDiseaseClasses } from "@/assets/model/ClassesAndDescription/classes";
import { plantDiseaseClassesDescription } from "@/assets/model/ClassesAndDescription/diseaseDescription";
import FrontPage from "@/components/ui/front";
import { saveClassifiedImage } from "@/lib/imageUtil";
import PrescriptionModal from "@/components/chat/PrescriptionModal";
import { supabase } from "@/lib/supabaseClient";
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';
import AddCommentModal from '@/components/comments/AddCommentModal';
import ViewCommentsModal from '@/components/comments/ViewCommentsModal';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [hasSaved, setHasSaved] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [addCommentVisible, setAddCommentVisible] = useState(false);
  const [commentDisease, setCommentDisease] = useState('');
  const [loadingComment, setLoadingComment] = useState(false);
  const [viewCommentsVisible, setViewCommentsVisible] = useState(false);
  const [savedImagePath, setSavedImagePath] = useState<string | null>(null);

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
  const [modalVisible, setModalVisible] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(false);

  const getPrescription = async () => {
    setLoading(true);
    try {
      const question = ``;

      const response = await fetch("", {
        method: "POST",
        headers: {
          Authorization: "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "",
          messages: [
            {
              role: "user",
              content: question,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenRouter API error:", response.status, errorText);
        setPrescription('Unable to fetch prescription at this time.');
        return;
      }

      const data = await response.json();
      const prescriptionText = data.choices?.[0]?.message?.content ?? 'No prescription found.';
      setPrescription(prescriptionText);

      const jsonPath = getJsonPathForImage(imageUri);
      try {
        const info = await FileSystem.getInfoAsync(jsonPath);
        if (info.exists) {
          const jsonStr = await FileSystem.readAsStringAsync(jsonPath);
          const meta = JSON.parse(jsonStr);
          meta.prescription = prescriptionText;
          // Ensure the directory exists before writing
          const dirPath = jsonPath.substring(0, jsonPath.lastIndexOf('/'));
          const dirInfo = await FileSystem.getInfoAsync(dirPath);
          if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });
          }
          await FileSystem.writeAsStringAsync(jsonPath, JSON.stringify(meta));
        }
      } catch (e) {
        console.error('Error updating prescription in JSON:', e);
      }
    } catch (error) {
      console.error("Error calling OpenRouter API:", error);
      setPrescription('Unable to fetch prescription at this time.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
    getPrescription();
  };
  const USER_FILE = FileSystem.documentDirectory + "user.json";

  const locations = [
    'Brgy. Puntalinao', 'Pintatagan', 'Maputi', 'Piso', 'Causwagan',
    'Mahayag', 'Panikian', 'Cabangcalan', 'Calubihan', 'Mogbongcogon',
    'Poblacion', 'Caganganan', 'San Vicente', 'Rang ay',
  ];

  const [open, setOpen] = useState(false);
  const [locationItems, setLocationItems] = useState(
    locations.map(loc => ({ label: loc, value: loc }))
  );

  const [modalLogInVisible, setLogInModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const checkUserFile = async () => {
      const fileInfo = await FileSystem.getInfoAsync(USER_FILE);
      if (!fileInfo.exists) {
        setLogInModalVisible(true);
      } else {
        setLogInModalVisible(false);
        // Read username from file
        try {
          const data = await FileSystem.readAsStringAsync(USER_FILE);
          const user = JSON.parse(data);
          if (user && user.username) {
            setUsername(user.username);
          }
        } catch (e) {
          console.log('Failed to read user file:', e);
        }
      }
      setLoadingLogin(false);
    };
    checkUserFile();
  }, []);

  const handleLogin = async () => {
    if (!username || !location) {
      Alert.alert('Please enter username and select location.');
      return;
    }
    setLoadingLogin(true);
    try {
      // Check if username exists
      const { data, error: selectError } = await supabase
        .from('user_logins')
        .select('username')
        .eq('username', username)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        // PGRST116 = No rows found, so only alert for other errors
        Alert.alert('Error checking username', selectError.message);
        setLoadingLogin(false);
        return;
      }

      if (data) {
        // Username exists, update location
        const { error: updateError } = await supabase
          .from('user_logins')
          .update({ location })
          .eq('username', username);

        if (updateError) {
          Alert.alert('Error updating location', updateError.message);
          setLoadingLogin(false);
          return;
        }
      } else {
        // Username does not exist, insert new
        const { error: insertError } = await supabase
          .from('user_logins')
          .insert([{ username, location }]);

        if (insertError) {
          Alert.alert('Error saving to Supabase', insertError.message);
          setLoadingLogin(false);
          return;
        }
      }

      // Save JSON file locally
      const dataToSave = JSON.stringify({ username, location });
      await FileSystem.writeAsStringAsync(USER_FILE, dataToSave);

      setUsername(username);
      setLogInModalVisible(false);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleAddComment = (disease: string) => {
    setCommentDisease(disease);
    setAddCommentVisible(true);
  };

  const handleSubmitComment = async (comment: string) => {
    console.log('handleSubmitComment called', { username, commentDisease, comment });
    if (!username || !commentDisease || !comment) return;
    setAddCommentVisible(false);
    setLoadingComment(true);
    const date = new Date().toISOString();
    const { error } = await supabase.from('comments').insert([
      { username, disease: commentDisease, comment, date }
    ]);
    setLoadingComment(false);
    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
    Alert.alert('Success', 'Comment added!');
  };

  // Helper to extract file info for metadata JSON
  function getImageMetaInfo(imageUri: string, classification: string, confidence: number, prescription: string) {
    // Sanitize classification for directory naming
    const sanitizedClass = classification.replace(/[^a-zA-Z0-9_-]/g, "_");
    // Format confidence value
    const sanitizedConfidence = confidence.toFixed(2).replace(".", "_");
    // Generate timestamp for the file name (YYYYMMDD_HHMMSS format)
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/:/g, "_")
      .replace(/\./g, "_")
      .replace(/-/g, "_")
      .replace(/T/, "-");
    // Directory and file name
    const directoryPath = `${FileSystem.documentDirectory}images/${sanitizedClass}`;
    // Use the image file's base name for the JSON file
    const fileName = imageUri.split('/').pop() || `${sanitizedConfidence}-${timestamp}-1.jpg`;
    const jsonName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.json');
    const filePath = `${directoryPath}/${fileName}`;
    const jsonPath = `${directoryPath}/${jsonName}`;
    // Date string
    const dateString = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    return { directoryPath, fileName, filePath, jsonPath, dateString };
  }

  // Helper to get JSON path for an image
  function getJsonPathForImage(imageUri: string) {
    let cleanUri = imageUri.split('?')[0].split('#')[0];
    const fileName = cleanUri.split('/').pop() || '';
    const jsonName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.json');
    return cleanUri.replace(fileName, jsonName);
  }

  // Helper to save or update prescription in the JSON file for the current image
  const savePrescriptionToJson = async () => {
    if (classification && confidence !== null && savedImagePath) {
      const { directoryPath, fileName, jsonPath, dateString } = getImageMetaInfo(savedImagePath, classification, confidence, prescription);
      let meta = {
        id: fileName,
        class: classification,
        confidence: confidence,
        date: dateString,
        prescriptions: prescription
      };
      try {
        // Ensure the directory exists before writing the JSON file
        const dirInfo = await FileSystem.getInfoAsync(directoryPath);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
        }
        await FileSystem.writeAsStringAsync(jsonPath, JSON.stringify(meta));
        console.log('JSON saved at:', jsonPath);
      } catch (e) {
        console.error('Error saving image metadata JSON:', e);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Full-screen loading overlay when logging in or submitting comment */}
      {(loadingLogin || loadingComment) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>{loadingLogin ? 'Logging in...' : 'Submitting comment...'}</Text>
        </View>
      )}
      <Modal visible={modalLogInVisible} animationType="slide" transparent>
        <View style={styles.loginModalContainer}>
          <View style={styles.loginModalContent}>
            <Text style={styles.loginTitle}>Log In</Text>
            <Text>Username:</Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                marginBottom: 10,
                width: 200,
                backgroundColor: '#fff',
              }}
              placeholder="Enter username"
              onChangeText={setUsername}
              value={username}
              editable={!loadingLogin}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <MaterialIcons name="location-on" size={22} color="#4CAF50" style={{ marginRight: 6 }} />
              <Text style={styles.locationLabel}>Select your location:</Text>
            </View>
            <View style={styles.pickerContainerBeautiful}>
              <DropDownPicker
                open={open}
                value={location}
                items={locationItems}
                setOpen={setOpen}
                setValue={setLocation}
                setItems={setLocationItems}
                placeholder="-- Select a location --"
                containerStyle={{ width: 220, zIndex: 1000 }}
                style={styles.dropdownBeautiful}
                dropDownContainerStyle={styles.dropdownContainerBeautiful}
                zIndex={1000}
                zIndexInverse={3000}
                listMode="MODAL"
                disabled={loadingLogin}
                textStyle={{ fontSize: 16, color: '#333' }}
                placeholderStyle={{ color: '#aaa', fontStyle: 'italic' }}
                ArrowDownIconComponent={() => <MaterialIcons name="keyboard-arrow-down" size={24} color="#4CAF50" />}
                ArrowUpIconComponent={() => <MaterialIcons name="keyboard-arrow-up" size={24} color="#4CAF50" />}
                selectedItemLabelStyle={styles.dropdownSelectedItemLabel}
                selectedItemContainerStyle={styles.dropdownSelectedItemContainer}
              />
            </View>
            {!loadingLogin && (
              <Button title="Login" onPress={handleLogin} disabled={loadingLogin} />
            )}
          </View>
        </View>
      </Modal>
      
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
                      {confidence > 90 && classification !== "Healthy" && (
                        <View style={{ marginTop: 10 }}>
                          <View style={styles.container}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 16, marginVertical: 8 }}>
                              <Pressable onPress={handleOpenModal} style={styles.iconButton} accessibilityLabel="Ask AI for Prescription">
                                <MaterialIcons name="psychology" size={28} color="#007AFF" />
                              </Pressable>
                              <Pressable onPress={() => handleAddComment(classification)} style={styles.iconButton} accessibilityLabel="Add Comment">
                                <MaterialIcons name="add-comment" size={28} color="#43a047" />
                              </Pressable>
                              <Pressable onPress={() => setViewCommentsVisible(true)} style={styles.iconButton} accessibilityLabel="View Comments">
                                <MaterialIcons name="comment" size={28} color="#888" />
                              </Pressable>
                            </View>
                            <PrescriptionModal
                              visible={modalVisible}
                              onClose={async () => {
                                setModalVisible(false);
                                await savePrescriptionToJson();
                              }}
                              loading={loading}
                              prescription={prescription}
                              classification={classification}
                            />
                          </View>

                        </View>
                      )}
                      {(() => {
                        if(hasSaved && confidence > 90){
                          (async () => {
                            // Save the image and get the actual saved path
                            const savedPath = await saveClassifiedImage(imageUri, classification, confidence);
                            if (typeof savedPath === 'string') {
                              setSavedImagePath(savedPath);
                              // Always save the JSON metadata right after saving the image, using the actual saved image path
                              const { directoryPath, fileName, jsonPath, dateString } = getImageMetaInfo(savedPath, classification, confidence, prescription);
                              const meta = {
                                id: fileName,
                                class: classification,
                                confidence: confidence,
                                date: dateString,
                                prescriptions: prescription
                              };
                              try {
                                // Ensure the directory exists before writing the JSON file
                                const dirInfo = await FileSystem.getInfoAsync(directoryPath);
                                if (!dirInfo.exists) {
                                  await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
                                }
                                await FileSystem.writeAsStringAsync(jsonPath, JSON.stringify(meta));
                                console.log('JSON saved at:', jsonPath);
                              } catch (e) {
                                console.error('Error saving image metadata JSON:', e);
                              }
                            } else {
                              console.error('Failed to save image, saveClassifiedImage returned:', savedPath);
                            }
                          })();
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
                onPress={async () => {
                  setIsModalVisible(false);
                  setClassification(null);
                  setConfidence(null);
                  setIsModalVisible(false);
                  setHasSaved(true);
                  setShowDescription(false);
                  // Save metadata JSON and log all JSON files
                  if (classification && confidence !== null && imageUri) {
                    const { directoryPath, fileName, jsonPath, dateString } = getImageMetaInfo(imageUri, classification, confidence, prescription);
                    const meta = {
                      id: fileName,
                      class: classification,
                      confidence: confidence,
                      date: dateString,
                      prescriptions: prescription
                    };
                    try {
                      // Ensure the directory exists before writing the JSON file
                      const dirInfo = await FileSystem.getInfoAsync(directoryPath);
                      if (!dirInfo.exists) {
                        await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
                      }
                      await FileSystem.writeAsStringAsync(jsonPath, JSON.stringify(meta));
                      // List and log all JSON files in the directory
                      const files = await FileSystem.readDirectoryAsync(directoryPath);
                      const jsonFiles = files.filter(f => f.endsWith('.json'));
                      for (const jf of jsonFiles) {
                        const jp = `${directoryPath}/${jf}`;
                        try {
                          const content = await FileSystem.readAsStringAsync(jp);
                          console.log('JSON file:', jf, content);
                        } catch (e) {
                          console.log('Error reading JSON file:', jf, e);
                        }
                      }
                    } catch (e) {
                      console.error("Error saving image metadata JSON:", e);
                    }
                  }
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>


      <AddCommentModal
        visible={addCommentVisible}
        onClose={() => setAddCommentVisible(false)}
        onSubmit={handleSubmitComment}
        username={username}
        disease={commentDisease}
      />

      <ViewCommentsModal
        visible={viewCommentsVisible}
        onClose={() => setViewCommentsVisible(false)}
        disease={classification ?? ""}
      />

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
    backgroundColor: "#eaffea",
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
    alignSelf: 'center',
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
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
    paddingVertical: 6,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  loginModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
  },
  
  loginModalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#4CAF50',
  },
  locationLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  pickerContainerBeautiful: {
    borderWidth: 0,
    borderRadius: 12,
    marginBottom: 18,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: '#fff',
  },
  dropdownBeautiful: {
    backgroundColor: '#eaffea',
    borderColor: '#43a047',
    borderRadius: 14,
    minHeight: 48,
    paddingLeft: 14,
    fontSize: 16,
    shadowColor: '#43a047',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownContainerBeautiful: {
    backgroundColor: '#fff',
    borderColor: '#43a047',
    borderRadius: 14,
    shadowColor: '#43a047',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 2,
  },
  dropdownSelectedItemLabel: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdownSelectedItemContainer: {
    backgroundColor: '#43a047',
    borderRadius: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 12,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});

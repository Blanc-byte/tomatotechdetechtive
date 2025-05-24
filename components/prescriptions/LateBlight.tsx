import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const LateBlight: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContentWrapper}>
          {onClose && (
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close ✕</Text>
            </Pressable>
          )}
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>Tomato Late Blight</Text>

            <Text style={styles.sectionTitle}>1. Preventive Measures</Text>

            <Text style={styles.subtitle}>Use Disease Resistant Varieties:</Text>
            <Text style={styles.text}>
              Choose late blight resistant tomatoes like Iron Lady F1, Mountain Magic, or Plum Regal.
            </Text>

            <Text style={styles.subtitle}>Plant in a Well Ventilated Area:</Text>
            <Text style={styles.text}>
              Space plants 18–24 inches apart for good airflow, and prune lower leaves to reduce humidity buildup.
            </Text>

            <Text style={styles.subtitle}>Practice Crop Rotation:</Text>
            <Text style={styles.text}>
              Avoid planting tomatoes in the same area every year. Rotate with non-host plants like potatoes or leafy greens.
            </Text>

            <Text style={styles.subtitle}>Mulch to Reduce Soil Splash:</Text>
            <Text style={styles.text}>
              Use plastic mulch to prevent soil contamination.
            </Text>

            <Text style={styles.subtitle}>Avoid Overhead Watering:</Text>
            <Text style={styles.text}>
              Use drip irrigation or soaker hoses to keep leaves dry. Water in the morning so plants dry before nightfall.
            </Text>

            <Text style={styles.subtitle}>Sterilize Tools & Avoid Handling Wet Plants:</Text>
            <Text style={styles.text}>
              Clean tools with 70% alcohol or 10% bleach solution after use, and avoid working with plants when they are wet.
            </Text>

            <Text style={styles.sectionTitle}>2. Disease Control Strategies (if infected)</Text>

            <Text style={styles.text}>• Apply organic fungicides like copper-based fungicides and Bacillus subtilis-based biofungicides.</Text>
            <Text style={styles.text}>• Apply chemical fungicides if infection is severe: Chlorothalonil (Bravo, Daconil) protects some healthy plants.</Text>
            <Text style={styles.text}>• Use Mancozeb or Metalaxyl (Ridomil Gold) for commercial use.</Text>
            <Text style={styles.text}>• Monitor and reapply sprays every 7–10 days, rotating fungicides to prevent resistance.</Text>

            <Text style={styles.sectionTitle}>Follow-up & Monitoring</Text>

            <Text style={styles.text}>• Conduct regular field inspections at least twice a week.</Text>
            <Text style={styles.text}>• Take immediate action if symptoms appear.</Text>
            <Text style={styles.text}>• Maintain a fungicide application schedule diligently.</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentWrapper: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
    width: "90%",
  },
  modalContent: {
    paddingBottom: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default LateBlight;

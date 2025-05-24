import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const BacterialSpot: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContentWrapper}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close ✕</Text>
          </Pressable>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>1. Prevention Measures</Text>
            <Text style={styles.subtitle}>Seed Selection:</Text>
            <Text style={styles.text}>
              It is essential to use certified disease-free seeds to prevent initial infection.
            </Text>
            <Text style={styles.subtitle}>Crop Rotation:</Text>
            <Text style={styles.text}>
              Avoid planting tomatoes in the same location for at least two to three years to disrupt bacterial survival.
            </Text>
            <Text style={styles.subtitle}>Plant Spacing:</Text>
            <Text style={styles.text}>
              Ensure adequate spacing between plants to promote airflow and reduce humidity, minimizing bacterial spot.
            </Text>
            <Text style={styles.subtitle}>Irrigation Management:</Text>
            <Text style={styles.text}>
              Avoid overhead watering and wand sprinklers. Use soaker hoses or drip irrigation to keep foliage dry.
            </Text>
            <Text style={styles.subtitle}>Sanitation Practices:</Text>
            <Text style={styles.text}>
              Routinely sterilize tools using 10% bleach or 70% isopropyl alcohol. Avoid handling wet plants.
            </Text>

            <Text style={styles.title}>2. Disease Control Strategies (if infected)</Text>
            <Text style={styles.text}>• Apply copper-based bactericides like Copper hydroxide or Copper sulfate.</Text>
            <Text style={styles.text}>• Use bacteriophage-based treatments. Destroy infected plants immediately.</Text>

            <Text style={styles.title}>3. Follow-up & Monitoring</Text>
            <Text style={styles.text}>• Monitor weekly for symptoms. Consult a specialist if symptoms persist.</Text>
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
    margin: 20,
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
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
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default BacterialSpot;

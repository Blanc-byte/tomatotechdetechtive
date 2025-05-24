import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const SeptoriaLeafSpot: React.FC<Props> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>Septoria Leaf Spot</Text>

            <Text style={styles.sectionTitle}>1. Prevention Measures</Text>

            <Text style={styles.subtitle}>Crop Rotation:</Text>
            <Text style={styles.text}>
              Avoid planting tomatoes or related host crops like potatoes and eggplant in the same location for at least two years to reduce the risk of soil-borne pathogens.
            </Text>

            <Text style={styles.subtitle}>Sanitation:</Text>
            <Text style={styles.text}>
              Remove and destroy infected leaves and plant debris promptly to prevent the spread of the fungus.
            </Text>

            <Text style={styles.subtitle}>Mulching:</Text>
            <Text style={styles.text}>
              Apply mulch around the base of the plants to minimize soil splashing, which leads to spreading fungal spores.
            </Text>

            <Text style={styles.subtitle}>Avoid Overhead Watering:</Text>
            <Text style={styles.text}>
              Use drip irrigation or water at the base of the plants to keep foliage dry, as wet leaves promote fungal growth.
            </Text>

            <Text style={styles.subtitle}>Watering Time:</Text>
            <Text style={styles.text}>
              Water early in the day to allow leaves to dry before evening, reducing the risk of disease development.
            </Text>

            <Text style={styles.sectionTitle}>2. Treatment Strategies if Already Infected</Text>

            <Text style={styles.subtitle}>Fungicide Application:</Text>
            <Text style={styles.text}>
              Apply fungicides at first sign of infection and continue at intervals as per the product label, to slow the spread of the disease.
            </Text>

            <Text style={styles.subtitle}>Fungicides to Apply:</Text>
            <Text style={styles.text}>• Chlorothalonil (broad-spectrum, protectant fungicide).</Text>
            <Text style={styles.text}>• Copper-based fungicides (suitable for organic growers).</Text>
            <Text style={styles.text}>• Mancozeb (preventative and contact fungicide).</Text>
            <Text style={styles.text}>• Difenoconazole + Propiconazole (systemic fungicides for severe cases).</Text>

            <Text style={styles.subtitle}>Application Timing:</Text>
            <Text style={styles.text}>
              Apply fungicides at 7 to 10-day intervals throughout the season, especially during wet weather conditions.
            </Text>

            <Text style={styles.sectionTitle}>3. Follow-up & Monitoring</Text>
            <Text style={styles.text}>
              Check plants at least twice a week during warm, humid conditions; optimal for disease spread.
            </Text>
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
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  modalContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
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
    marginBottom: 6,
  },
});

export default SeptoriaLeafSpot;

import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const TargetSpot: React.FC<Props> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>Target Spot</Text>

            <Text style={styles.sectionTitle}>Prevention Measures</Text>

            <Text style={styles.subtitle}>Use disease-free seeds and transplants:</Text>
            <Text style={styles.text}>
              Ensure plants are free of fungal spores before planting.
            </Text>

            <Text style={styles.subtitle}>Crop Rotation:</Text>
            <Text style={styles.text}>
              Avoid planting tomatoes in the same field every season to break the disease cycle.
            </Text>

            <Text style={styles.subtitle}>Improve Air Circulation:</Text>
            <Text style={styles.text}>
              Space plants properly and prune lower leaves to enhance airflow.
            </Text>

            <Text style={styles.subtitle}>Water Management:</Text>
            <Text style={styles.text}>
              Use drip irrigation instead of overhead watering to keep leaves dry.
            </Text>

            <Text style={styles.subtitle}>Remove and Destroy Infected Plant Material:</Text>
            <Text style={styles.text}>
              Prevents fungal spores from spreading.
            </Text>

            <Text style={styles.sectionTitle}>Treatment Strategies if Infected</Text>

            <Text style={styles.text}>
              • Apply biofungicides like <Text style={{ fontStyle: "italic" }}>Bacillus subtilis</Text> or <Text style={{ fontStyle: "italic" }}>Trichoderma</Text> species as preventive treatment.
            </Text>
            <Text style={styles.text}>
              • Improve soil health with compost and organic amendments.
            </Text>

            <Text style={styles.subtitle}>Chemical Control for Severe Cases:</Text>
            <Text style={styles.text}>• Chlorothalonil (2.5–3 g/L)</Text>
            <Text style={styles.text}>• Mancozeb (2–3 g/L)</Text>
            <Text style={styles.text}>• Azoxystrobin or Difenoconazole</Text>

            <Text style={styles.subtitle}>Application Timing:</Text>
            <Text style={styles.text}>
              Apply every 7–14 days, depending on weather conditions, and alternate fungicides to prevent resistance development.
            </Text>

            <Text style={styles.sectionTitle}>Follow-up & Monitoring</Text>
            <Text style={styles.text}>• Check plants weekly for early signs of infection.</Text>
            <Text style={styles.text}>• Look for target-like lesions on leaves and stems.</Text>
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

export default TargetSpot;

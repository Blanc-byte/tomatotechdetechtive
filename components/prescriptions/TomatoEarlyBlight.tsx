import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const TomatoEarlyBlight: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          {onClose && (
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close ✕</Text>
            </Pressable>
          )}
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>Tomato Early Blight</Text>
            <Text style={styles.intro}>
              This issue cannot be completely cured once it infects a plant, but it can be effectively managed to reduce its impact and prevent further spread.
            </Text>

            <Text style={styles.sectionTitle}>1. Preventive Measures</Text>

            <Text style={styles.subtitle}>Seed & transplant health:</Text>
            <Text style={styles.text}>
              Use certified disease-free seeds and transplants to prevent initial infection. Treat seeds with a hot water soak at 50°C for 25 minutes or use fungicide seed treatment before planting.
            </Text>

            <Text style={styles.subtitle}>Plant spacing & airflow management:</Text>
            <Text style={styles.text}>
              Space plants at least 18-24 inches apart to promote good air circulation and reduce leaf wetness. Stake tomato plants to keep foliage off the ground.
            </Text>

            <Text style={styles.subtitle}>Irrigation & moisture control:</Text>
            <Text style={styles.text}>
              Avoid overhead watering. Instead, use drip irrigation or soaker hoses to keep leaves dry. Water in the morning to allow foliage to dry quickly.
            </Text>

            <Text style={styles.subtitle}>Soil practices:</Text>
            <Text style={styles.text}>
              Maintain proper soil nutrition, particularly nitrogen, potassium, and calcium, to support plant immunity.
            </Text>

            <Text style={styles.sectionTitle}>2. Disease Control Strategies (if infected)</Text>

            <Text style={styles.text}>• Apply preventive fungicides such as chlorothalonil, mancozeb, or copper-based fungicides at recommended intervals.</Text>
            <Text style={styles.text}>• Use Trichoderma spp.-based biofungicides as natural soil treatment.</Text>

            <Text style={styles.subtitle}>Pruning & removal of infected leaves:</Text>
            <Text style={styles.text}>
              Regularly remove lower leaves showing early signs of infection to slow disease spread. Disinfect pruning tools using 10% bleach solution or 70% isopropyl alcohol between cuts.
            </Text>

            <Text style={styles.sectionTitle}>Follow-up & Monitoring</Text>

            <Text style={styles.text}>• Inspect plants regularly for early signs of leaf spots. Start fungicide treatment at the first sign of infection and repeat every 7-10 days as early intervention.</Text>
            <Text style={styles.text}>• Adjust irrigation and fertilization practices based on plant health and disease pressure.</Text>
            <Text style={styles.text}>• If severe infection persists, consult an agricultural specialist for advanced disease management strategies.</Text>
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
  },
  modalBox: {
    maxHeight: "80%",
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  intro: {
    fontSize: 14,
    marginBottom: 15,
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
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});

export default TomatoEarlyBlight;

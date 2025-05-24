import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const LeafMold: React.FC<Props> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>Leaf Mold</Text>

            <Text style={styles.sectionTitle}>1. Prevention Measures</Text>

            <Text style={styles.subtitle}>Improve Airflow & Reduce Humidity:</Text>
            <Text style={styles.text}>
              Space plants 18–24 inches apart, prune lower leaves, and stake to reduce moisture buildup. 
              If growing in a greenhouse, use ventilation fans or open vents to keep humidity below 85%.
            </Text>

            <Text style={styles.subtitle}>Watering Best Practices:</Text>
            <Text style={styles.text}>
              Avoid overhead watering; only use drip irrigation or soaker hoses. Water in the morning to allow leaves to dry during the day.
            </Text>

            <Text style={styles.subtitle}>Sanitize Tools & Greenhouse Surfaces:</Text>
            <Text style={styles.text}>
              Disinfect tools, stakes, and greenhouse surfaces with 10% bleach solution or 70% alcohol. Do not reuse contaminated stakes.
            </Text>

            <Text style={styles.subtitle}>Use Mulch to Prevent Soil Splash:</Text>
            <Text style={styles.text}>
              Use black plastic or wood chip mulch to reduce spore spread from the soil.
            </Text>

            <Text style={styles.sectionTitle}>2. Control Measures if Symptoms Appear</Text>

            <Text style={styles.text}>
              If early symptoms are detected, remove infected leaves immediately to slow disease spread. Increase air circulation by pruning, staking, and ventilating.
              Apply organic or chemical fungicides as a preventive measure.
            </Text>

            <Text style={styles.subtitle}>Organic Options:</Text>
            <Text style={styles.text}>• Copper-based fungicides</Text>
            <Text style={styles.text}>• Bacillus subtilis-based biofungicides</Text>

            <Text style={styles.subtitle}>Chemical Options (If Severe):</Text>
            <Text style={styles.text}>• Chlorothalonil (Daconil, Bravo)</Text>
            <Text style={styles.text}>• Mancozeb (Dithane M-45, Penncozeb)</Text>

            <Text style={styles.text}>
              Repeat fungicide application every 7–10 days or as directed.
            </Text>

            <Text style={styles.sectionTitle}>Follow-up & Monitoring</Text>

            <Text style={styles.text}>• Inspect plants weekly, increasing to twice a week during humid conditions.</Text>
            <Text style={styles.text}>• Check if plants are overcrowded and prune leaves to enhance airflow conditions.</Text>
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

export default LeafMold;

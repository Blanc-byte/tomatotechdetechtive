import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const SpiderMites: React.FC<Props> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>Spider Mites</Text>

            <Text style={styles.sectionTitle}>1. Cultural Practices</Text>

            <Text style={styles.subtitle}>Weed Management:</Text>
            <Text style={styles.text}>
              Proper weed control is crucial, as weeds can serve as alternate hosts for spider mites. Managing weeds around tomato fields can help prevent mite infestations.
            </Text>

            <Text style={styles.subtitle}>Plant Health:</Text>
            <Text style={styles.text}>
              Maintaining plant health through adequate watering, fertilization, and mulching can reduce plant stress and make them less susceptible to mite infestations.
            </Text>

            <Text style={styles.sectionTitle}>2. Treatment Strategies if Disease is Present</Text>

            <Text style={styles.subtitle}>Chemical Control:</Text>
            <Text style={styles.text}>
              • Applying horticultural oil sprays or insecticidal soaps can effectively manage spider mite populations. Ensure thorough coverage of both upper and lower leaf surfaces.
            </Text>

            <Text style={styles.subtitle}>Biological Control:</Text>
            <Text style={styles.text}>
              • Predatory mites such as <Text style={{ fontStyle: "italic" }}>Phytoseiulus persimilis</Text> can help control spider mite populations.
            </Text>

            <Text style={styles.sectionTitle}>3. Follow-up & Monitoring</Text>
            <Text style={styles.text}>• Inspect plants twice a week during warm, dry weather when mites are most active.</Text>
            <Text style={styles.text}>• Conduct weekly monitoring during cooler or humid seasons.</Text>
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

export default SpiderMites;

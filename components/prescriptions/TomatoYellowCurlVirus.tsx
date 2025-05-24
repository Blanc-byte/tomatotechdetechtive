import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const TomatoYellowCurlVirus: React.FC<Props> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>Tomato Yellow Curl Virus</Text>

            <Text style={styles.sectionTitle}>Prevention Measures</Text>

            <Text style={styles.subtitle}>Use Resistant Varieties:</Text>
            <Text style={styles.text}>
              Grow TYLCV-resistant tomato cultivars like <Text style={{ fontStyle: "italic" }}>Tygress</Text> and <Text style={{ fontStyle: "italic" }}>Shanty</Text>.
            </Text>

            <Text style={styles.subtitle}>Remove and Destroy Infected Plants:</Text>
            <Text style={styles.text}>
              Immediately uproot and discard infected plants to prevent virus spread.
            </Text>

            <Text style={styles.subtitle}>Practice Crop Rotation:</Text>
            <Text style={styles.text}>
              Rotate tomatoes with non-host crops to break the disease cycle.
            </Text>

            <Text style={styles.subtitle}>Whitefly Control:</Text>
            <Text style={styles.text}>
              Use yellow sticky traps to attract and reduce whitefly populations.
            </Text>

            <Text style={styles.subtitle}>Apply Reflective Mulch:</Text>
            <Text style={styles.text}>
              Reflective mulch forces back whiteflies and reduces virus transmission.
            </Text>

            <Text style={styles.sectionTitle}>Chemical and Biological Control</Text>

            <Text style={styles.text}>
              • Apply insecticides if necessary: neem oil, insecticidal soaps, or imidacloprid-based treatments to reduce whitefly populations.
            </Text>
            <Text style={styles.text}>
              • Use systemic insecticides like imidacloprid or pyrethroids when whitefly populations are high (follow agricultural guidelines).
            </Text>
            <Text style={styles.text}>
              • Spray horticultural oils early to reduce whitefly activity.
            </Text>

            <Text style={styles.sectionTitle}>Follow-up & Monitoring</Text>

            <Text style={styles.text}>• Check plants weekly for early symptoms like yellowing and curling leaves.</Text>
            <Text style={styles.text}>• Monitor whitefly populations using sticky traps and visual scouting.</Text>
            <Text style={styles.text}>• Increase insecticide applications if whitefly infestations rise.</Text>
            <Text style={styles.text}>• Remove heavily infected plants to prevent further spread.</Text>
            <Text style={styles.text}>• Continue preventive practices even after controlling the initial outbreak.</Text>
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

export default TomatoYellowCurlVirus;

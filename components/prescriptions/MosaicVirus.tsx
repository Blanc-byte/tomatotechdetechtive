import React from "react";
import { Modal, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose?: () => void;
}

const MosaicVirus: React.FC<Props> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>Mosaic Virus</Text>

            <Text style={styles.subtitle}>Use Certified Disease-Free Seeds and Transplant:</Text>
            <Text style={styles.text}>Reduces the risk of early infection.</Text>

            <Text style={styles.subtitle}>Sanitation Practices:</Text>
            <Text style={styles.text}>
              Regularly disinfect tools and equipment, remove infected plant debris, and practice good hygiene to help prevent virus spread.
            </Text>

            <Text style={styles.subtitle}>Remove and Destroy Infected Plants:</Text>
            <Text style={styles.text}>
              Uproot and dispose of affected plants to prevent further spread.
            </Text>

            <Text style={styles.subtitle}>Rotate Crops:</Text>
            <Text style={styles.text}>
              Avoid planting tomatoes in the same area for consecutive seasons.
            </Text>

            <Text style={styles.subtitle}>Control Weeds:</Text>
            <Text style={styles.text}>
              Weeds can serve as alternate hosts for the virus.
            </Text>

            <Text style={styles.subtitle}>Biological Control:</Text>
            <Text style={styles.text}>• Use beneficial microbes like <Text style={{ fontStyle: "italic" }}>Trichoderma</Text> spp.</Text>
            <Text style={styles.text}>• <Text style={{ fontStyle: "italic" }}>Bacillus subtilis</Text> can enhance plant resistance.</Text>

            <Text style={styles.subtitle}>Chemical Control Limited Effectiveness:</Text>
            <Text style={styles.text}>
              Disinfect surfaces and tools using 1% Virkon-S or hydrogen peroxide solution to eliminate virus particles.
            </Text>

            <Text style={styles.sectionTitle}>Follow-up & Monitoring</Text>
            <Text style={styles.text}>• Check plants weekly for leaf mottling, distortion, and fruit symptoms.</Text>
            <Text style={styles.text}>• Monitor nearby plants to prevent further spread.</Text>
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

export default MosaicVirus;

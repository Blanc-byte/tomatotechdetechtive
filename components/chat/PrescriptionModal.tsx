import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, Pressable, ScrollView } from 'react-native';

interface PrescriptionModal {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  prescription: string;
  classification: string;
}

const PrescriptionModal: React.FC<PrescriptionModal> = ({
  visible,
  onClose,
  loading,
  prescription,
  classification,
}) => {
  return (
    <Modal style={styles.modalContainerWhole} animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Prescription for {classification}</Text>
          <View style={styles.divider} />
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 30 }} />
          ) : (
            <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
              <Text style={styles.modalText}>{prescription}</Text>
            </ScrollView>
          )}
          <Pressable style={styles.closeButton} onPress={onClose} android_ripple={{ color: '#fff' }}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default PrescriptionModal;

const styles = StyleSheet.create({
  modalContainerWhole: {
    backgroundColor: '#eaffea',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 16,
  },
  modalView: {
    width: '92%',
    maxHeight: '85%',
    backgroundColor: '#eaffea',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1a1a1a',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 14,
  },
  scrollArea: {
    width: '100%',
    maxHeight: 380,
    marginBottom: 18,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  modalText: {
    fontSize: 17,
    color: '#333',
    textAlign: 'left',
    lineHeight: 25,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 38,
    marginTop: 4,
    alignSelf: 'center',
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
});

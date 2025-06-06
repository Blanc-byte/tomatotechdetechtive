import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { supabase } from '@/lib/supabaseClient';

interface ViewCommentsModalProps {
  visible: boolean;
  onClose: () => void;
  disease: string;
}

interface Comment {
  id: number;
  username: string;
  comment: string;
  date: string;
}

const ViewCommentsModal: React.FC<ViewCommentsModalProps> = ({ visible, onClose, disease }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible || !disease || !disease.trim()) return;
    // console.log('Fetching comments for disease:', disease, typeof disease, disease.length);
    setLoading(true);
    supabase
      .from('comments')
      .select('*')
      .filter('disease', 'ilike', `%${disease.trim()}%`)
      .order('date', { ascending: false })
      .then(({ data, error }) => {
        // console.log('Fetched comments:', data, error);
        setLoading(false);
        if (error) {
          setComments([]);
        } else {
          setComments(data || []);
        }
      });
  }, [visible, disease]);

  const renderItem = ({ item }: { item: Comment }) => (
    <View style={styles.card}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  // console.log('Modal disease prop:', disease, typeof disease, disease.length);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Comments</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="large" color="#43a047" style={{ marginTop: 30 }} />
          ) : comments.length === 0 ? (
            <Text style={styles.noComments}>No comments yet.</Text>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
              style={{ maxHeight: 350 }}
              showsVerticalScrollIndicator
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: 340,
    maxHeight: 500,
    alignItems: 'stretch',
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43a047',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#43a047',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noComments: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#eaffea',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#43a047',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 4,
    fontSize: 15,
  },
  comment: {
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default ViewCommentsModal; 
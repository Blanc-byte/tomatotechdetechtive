import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '@/lib/supabase';

export default function AuthModal({ visible, onAuthSuccess }: { visible: boolean, onAuthSuccess: (user: any) => void }) {
  const handleGoogleSignIn = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      alert('Google sign-in failed');
    } else if (user) {
      onAuthSuccess(user);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome!</Text>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  content: { backgroundColor: '#fff', padding: 30, borderRadius: 12, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  googleButton: { backgroundColor: '#4285F4', padding: 14, borderRadius: 8 },
  googleButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

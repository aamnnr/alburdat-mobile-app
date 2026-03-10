import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CustomModal({ modalVisible, setModalVisible, modalConfig }) {
  const { colors, isDark } = useTheme();

  const getHeaderColor = () => {
    if (modalConfig.type === 'success') return colors.primary;
    if (modalConfig.type === 'error') return colors.danger;
    return colors.gold;
  };

  return (
    <Modal 
      animationType="fade" 
      transparent={true} 
      visible={modalVisible} 
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={[styles.modalOverlay, { backgroundColor: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.6)' }]}>
        <View style={[styles.modalView, { backgroundColor: colors.card }]}>
          <View style={[styles.modalHeader, { backgroundColor: getHeaderColor() }]}>
            <Text style={styles.modalTitleText}>{modalConfig.title}</Text>
          </View>
          
          <View style={styles.modalBody}>
            <Text style={[styles.modalMessage, { color: colors.text }]}>
              {modalConfig.message}
            </Text>
            
            <View style={styles.modalActionRow}>
              {modalConfig.action ? (
                <>
                  <TouchableOpacity 
                    style={[styles.modalBtnCancel, { borderColor: colors.border }]} 
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[styles.modalBtnCancelText, { color: colors.textDim }]}>Batal</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.modalBtnConfirm, { backgroundColor: colors.danger }]} 
                    onPress={() => { setModalVisible(false); modalConfig.action(); }}
                  >
                    <Text style={styles.modalBtnConfirmText}>Ya, Lanjutkan</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity 
                  style={[styles.modalBtnClose, { backgroundColor: colors.primary }]} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalBtnCloseText}>Tutup</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 25 },
  modalView: { width: '100%', borderRadius: 15, overflow: 'hidden', elevation: 10 },
  modalHeader: { padding: 18, alignItems: 'center' },
  modalTitleText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  modalBody: { padding: 25 },
  modalMessage: { fontSize: 15, textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  modalActionRow: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  modalBtnClose: { paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8 },
  modalBtnCloseText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
  modalBtnCancel: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, flex: 1, alignItems: 'center' },
  modalBtnCancelText: { fontSize: 15, fontWeight: 'bold' },
  modalBtnConfirm: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flex: 1, alignItems: 'center' },
  modalBtnConfirmText: { color: '#ffffff', fontSize: 15, fontWeight: 'bold' },
});
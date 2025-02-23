import React from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

function ModalTester({ isModalVisible, setModalVisible }) {
  const toggleModal = () => {
    setModalVisible(false);
  };

  return (
      <Modal isVisible={isModalVisible}>
        <View style={{ 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'white', 
            padding: 20, 
            borderRadius: 10,
            height:200}}>
          <Text>SOON!</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
  );
}

export default ModalTester;

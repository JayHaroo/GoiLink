import { Modal, View, Text, StyleSheet, Pressable, Image, Linking } from "react-native"

export default function ModalTester({ isModalVisible, setModalVisible, walletAddress }) {
  const openMetamaskWebsite = () => {
    Linking.openURL("https://metamask.io/download.html")
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Connect to Metamask</Text>

          {walletAddress ? (
            <View style={styles.successContainer}>
              <Image source={require("../assets/metamask-icon.png")} style={styles.walletIcon} />
              <Text style={styles.successText}>Successfully Connected!</Text>
              <Text style={styles.addressText}>
                {`${walletAddress.substring(0, 10)}...${walletAddress.substring(walletAddress.length - 8)}`}
              </Text>
            </View>
          ) : (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionText}>To connect your Metamask wallet:</Text>

              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>1</Text>
                <Text style={styles.stepText}>Make sure you have Metamask installed on your device</Text>
              </View>

              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>2</Text>
                <Text style={styles.stepText}>Tap the button below to open Metamask</Text>
              </View>

              <View style={styles.stepContainer}>
                <Text style={styles.stepNumber}>3</Text>
                <Text style={styles.stepText}>Approve the connection request in Metamask</Text>
              </View>

              <Pressable
                style={styles.metamaskButton}
                onPress={() => {
                  Linking.canOpenURL("metamask://").then((supported) => {
                    if (supported) {
                      Linking.openURL("metamask://")
                    } else {
                      openMetamaskWebsite()
                    }
                  })
                }}
              >
                <Image source={require("../assets/metamask-icon.png")} style={styles.buttonIcon} />
                <Text style={styles.metamaskButtonText}>Open Metamask</Text>
              </Pressable>

              <Text style={styles.noteText}>
                Don't have Metamask?
                <Text style={styles.linkText} onPress={openMetamaskWebsite}>
                  {" "}
                  Download it here
                </Text>
              </Text>
            </View>
          )}

          <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 20,
  },
  instructionsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  instructionText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  stepNumber: {
    backgroundColor: "orange",
    color: "white",
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    lineHeight: 24,
    marginRight: 10,
    fontWeight: "bold",
  },
  stepText: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  metamaskButton: {
    backgroundColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  metamaskButtonText: {
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
  },
  noteText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
  },
  linkText: {
    color: "orange",
    textDecorationLine: "underline",
  },
  successContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  walletIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 15,
  },
  successText: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})


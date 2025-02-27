"use client"

import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, ImageBackground, Image, Pressable, Alert, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import ModalTester from "./modal"

export default function Landing() {
  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Function to connect to Metamask wallet
  const connectToMetamask = async () => {
    try {
      setIsConnecting(true)

      // Show the modal with connection instructions
      setModalVisible(true)

      // In a real implementation, you would:
      // 1. Check if Metamask is installed
      // 2. Request connection to the wallet
      // 3. Handle the connection response

      // For demonstration, we'll simulate a connection after a delay
      setTimeout(() => {
        // Generate a mock Ethereum address
        const mockAddress =
          "0x" +
          Array(40)
            .fill(0)
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")

        setWalletAddress(mockAddress)
        setIsConnecting(false)

        Alert.alert(
          "Connected",
          `Successfully connected to wallet: ${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
        )
      }, 10000)

      // For a real implementation, you would use a library like ethers.js
      // or web3.js with React Native, or deep link to the Metamask app
    } catch (error) {
      console.error("Connection error:", error)
      Alert.alert("Connection Error", "Failed to connect to Metamask. Please try again.")
      setIsConnecting(false)
    }
  }

  // Function to open Metamask app if installed
  const openMetamaskApp = () => {
    Linking.canOpenURL("metamask://").then((supported) => {
      if (supported) {
        Linking.openURL("metamask://")
      } else {
        Alert.alert("Metamask Not Installed", "Please install Metamask from the App Store or Google Play Store.", [
          {
            text: "Install Metamask",
            onPress: () => Linking.openURL("https://metamask.io/download.html"),
          },
          { text: "Cancel", style: "cancel" },
        ])
      }
    })
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/BG.png")}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/logo.png")}
            style={{
              resizeMode: "contain",
              height: 40,
              marginTop: 30,
            }}
          />

          <Pressable
            style={[styles.connect_button, isConnecting && styles.connect_button_disabled]}
            onPress={walletAddress ? openMetamaskApp : connectToMetamask}
            disabled={isConnecting}
          >
            <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/metamask-icon.png")}
                style={{
                  resizeMode: "contain",
                  height: 50,
                  width: 50,
                }}
              />

              <Text style={{ color: "orange" }}>
                {walletAddress
                  ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
                  : isConnecting
                    ? "Connecting..."
                    : "Connect Metamask Wallet"}
              </Text>
            </View>
          </Pressable>

          <Pressable style={styles.local_button} onPress={() => navigation.navigate("Form")}>
            <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 35 }}>🚀</Text>
              <Text style={{ color: "white", padding: 10 }}> Create a Local Ledger </Text>
            </View>
          </Pressable>

          <Pressable style={styles.local_button} onPress={() => navigation.navigate("LocalTransactions")}>
            <View style={{ padding: 5, flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 35 }}>📜</Text>
              <Text style={{ color: "white", padding: 10 }}> Deployed Ledgers </Text>
            </View>
          </Pressable>

          {/* Modal Component */}
          <ModalTester
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
            walletAddress={walletAddress}
          />
        </ImageBackground>
      </View>
      <StatusBar style="light" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
  },
  connect_button: {
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 15,
    marginTop: 100,
  },
  connect_button_disabled: {
    opacity: 0.7,
  },
  local_button: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    marginTop: 20,
  },
})


"use client"

import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView, StyleSheet, View } from "react-native"
import { ThemeProvider } from "./context/ThemeContext"
import { ContractProvider } from "./context/ContractContext"
import LandingPage from "./components/LandingPage"
import ContractForm from "./components/ContractForm"
import DeployedContracts from "./components/DeployedContracts"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("landing")

  const renderScreen = () => {
    switch (currentScreen) {
      case "landing":
        return <LandingPage onNavigate={setCurrentScreen} />
      case "create":
        return <ContractForm onBack={() => setCurrentScreen("landing")} />
      case "deployed":
        return <DeployedContracts onBack={() => setCurrentScreen("landing")} />
      default:
        return null
    }
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <ContractProvider>
        <StatusBar style="light" />
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>{renderScreen()}</View>
        </SafeAreaView>
      </ContractProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
})


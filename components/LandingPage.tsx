import type React from "react"
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from "react-native"
import { useTheme } from "../context/ThemeContext"

interface LandingPageProps {
  onNavigate: (screen: string) => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { colors } = useTheme()

  return (
    <ImageBackground source={require('../assets/BG.png')} style={styles.container}> 
      
      <Image source={require('../assets/header.png')} style={{width: 300, height: 200, marginBottom: 20, resizeMode: 'contain'}} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderWidth: 2, borderColor: colors.primary }] }
          onPress={() => onNavigate("create")}
        >
          <Text style={{fontSize: 29}}>🚀</Text>
          <Text style={[styles.buttonText, { color: 'white'}]}>Create Contract</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { borderWidth: 2, borderColor: colors.primary }]}
          onPress={() => onNavigate("deployed")}
        >
          <Text style={{fontSize: 20}}>📜</Text>
          <Text style={[styles.buttonText, { color: 'white'}]}>View Deployed</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
})

export default LandingPage


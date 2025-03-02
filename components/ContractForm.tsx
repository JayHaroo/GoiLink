"use client"

import type React from "react"

import { useContext, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import AgreementTypes from "./AgreementTypes"
import PartyInput from "./PartyInput"
import { ContractContext } from "../context/ContractContext"
import { useTheme } from "../context/ThemeContext"

const ContractForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { contract, setContract, saveContract } = useContext(ContractContext)
  const { colors } = useTheme()
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    agreement: true,
    parties: true,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const addParty = () => {
    setContract({
      ...contract,
      parties: [...contract.parties, { name: "", email: "", address: "" }],
    })
  }

  const removeParty = (index) => {
    if (contract.parties.length <= 2) {
      Alert.alert("Cannot Remove", "A contract requires at least two parties.")
      return
    }

    const updatedParties = [...contract.parties]
    updatedParties.splice(index, 1)
    setContract({
      ...contract,
      parties: updatedParties,
    })
  }

  const updateParty = (index, field, value) => {
    const updatedParties = [...contract.parties]
    updatedParties[index] = { ...updatedParties[index], [field]: value }
    setContract({
      ...contract,
      parties: updatedParties,
    })
  }

  const handleSave = () => {
    if (!contract.title.trim()) {
      Alert.alert("Missing Information", "Please enter a contract title")
      return
    }

    if (!contract.description.trim()) {
      Alert.alert("Missing Information", "Please enter a contract description")
      return
    }

    if (!contract.agreementType) {
      Alert.alert("Missing Information", "Please select an agreement type")
      return
    }

    const invalidParty = contract.parties.findIndex((party) => !party.name.trim() || !party.email.trim())
    if (invalidParty !== -1) {
      Alert.alert("Missing Information", `Please complete information for Party ${invalidParty + 1}`)
      return
    }

    saveContract()
    Alert.alert("Success", "Contract created successfully!")
  }

  const renderSectionHeader = (title, section) => (
    <TouchableOpacity onPress={() => toggleSection(section)} style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {expandedSections[section] ? (
        <Text style={{color: 'white', fontSize: 30}}>^</Text>
      ) : (
        <Text style={{color: 'white', fontSize: 30}}>.</Text>
      )}
    </TouchableOpacity>
  )

  return (
      <ScrollView style={(styles.container, { backgroundColor: colors.background})}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={{color: 'white', fontSize: 20, textDecorationLine: 'underline'}}>Back to menu</Text>
        </TouchableOpacity>
        <View style={[styles.formSection, { backgroundColor: colors.card }]}>
          {renderSectionHeader("Contract Details", "details")}
          {expandedSections.details && (
            <>
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Title</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  ]}
                  value={contract.title}
                  onChangeText={(text) => setContract({ ...contract, title: text })}
                  placeholder="Enter contract title"
                  placeholderTextColor={colors.secondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Description</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    { backgroundColor: colors.background, color: colors.text, borderColor: colors.border },
                  ]}
                  value={contract.description}
                  onChangeText={(text) => setContract({ ...contract, description: text })}
                  placeholder="Describe the purpose of this contract"
                  placeholderTextColor={colors.secondary}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </>
          )}
        </View>

        <View style={[styles.formSection, { backgroundColor: colors.card }]}>
          {renderSectionHeader("Agreement Type", "agreement")}
          {expandedSections.agreement && (
            <AgreementTypes
              selectedType={contract.agreementType}
              onSelect={(type) => setContract({ ...contract, agreementType: type })}
            />
          )}
        </View>

        <View style={[styles.formSection, { backgroundColor: colors.card }]}>
          {renderSectionHeader("Parties Involved", "parties")}
          {expandedSections.parties && (
            <>
              <View style={styles.sectionHeader}>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={addParty}>
                  <Text style={{color: 'black', fontSize: 30}}>+</Text>
                </TouchableOpacity>
              </View>

              {contract.parties.map((party, index) => (
                <PartyInput
                  key={index}
                  index={index}
                  party={party}
                  updateParty={updateParty}
                  removeParty={removeParty}
                  isRemovable={contract.parties.length > 2}
                />
              ))}
            </>
          )}
        </View>

        <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={[styles.saveButtonText, { color: colors.background }]}>Create Contract</Text>
        </TouchableOpacity>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  formSection: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    width: 300,
    alignSelf: "center",
  },
  saveIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    padding: 10,
    marginTop: 25,
  },
})

export default ContractForm


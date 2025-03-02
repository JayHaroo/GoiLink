"use client"

import type React from "react"
import { useContext, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native"
import { ContractContext } from "../context/ContractContext"
import { useTheme } from "../context/ThemeContext"

const DeployedContracts: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { savedContracts } = useContext(ContractContext)
  const [selectedContract, setSelectedContract] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    description: true,
    parties: true,
    blockchain: true,
  })
  const { colors } = useTheme()

  const openContractDetails = (contract) => {
    setSelectedContract(contract)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedContract(null)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const formatDate = (date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getContractHash = (contract) => {
    const contractString = JSON.stringify(contract)
    let hash = 0
    for (let i = 0; i < contractString.length; i++) {
      const char = contractString.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return "0x" + Math.abs(hash).toString(16).padStart(40, "0")
  }

  const renderContractItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.contractCard, { backgroundColor: colors.card }]}
      onPress={() => openContractDetails(item)}
    >
      <View style={styles.contractCardContent}>
        <View>
          <Text style={[styles.contractTitle, { color: colors.text }]}>{item.title}</Text>
          <Text style={[styles.contractType, { color: colors.secondary }]}>
            {getAgreementTypeLabel(item.agreementType)}
          </Text>
          <Text style={[styles.contractDate, { color: colors.secondary }]}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const getAgreementTypeLabel = (typeId) => {
    const types = {
      service: "Service Agreement",
      employment: "Employment Contract",
      rental: "Rental Agreement",
      sale: "Sale Contract",
      nda: "Non-Disclosure Agreement",
      custom: "Custom Agreement",
    }
    return types[typeId] || "Unknown Agreement"
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.header, { borderBottomColor: colors.border }]}> 
        <TouchableOpacity style={styles.backButton} onPress={onBack}> 
          <Text style={{ color: colors.text }}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Deployed Contracts</Text>
      </View>

      {savedContracts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.secondary }]}>No contracts deployed yet</Text>
        </View>
      ) : (
        <FlatList
          data={savedContracts}
          renderItem={renderContractItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
  },
  contractCard: {
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contractCardContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contractTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  contractType: {
    fontSize: 14,
    marginBottom: 8,
  },
  contractDate: {
    fontSize: 12,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
})

export default DeployedContracts

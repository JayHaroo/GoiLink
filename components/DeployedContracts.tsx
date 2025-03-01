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
import { ChevronRight, Calendar, FileText, Hash, X, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react-native"
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
          <View style={styles.contractMeta}>
            <Calendar size={14} color={colors.secondary} />
            <Text style={[styles.contractDate, { color: colors.secondary }]}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <ChevronRight size={20} color={colors.secondary} />
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

  const renderSectionHeader = (title, section) => (
    <TouchableOpacity onPress={() => toggleSection(section)} style={styles.sectionHeader}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {expandedSections[section] ? (
        <ChevronUp size={20} color={colors.text} />
      ) : (
        <ChevronDown size={20} color={colors.text} />
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Deployed Contracts</Text>
      </View>

      {savedContracts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FileText size={60} color={colors.secondary} />
          <Text style={[styles.emptyText, { color: colors.secondary }]}>No contracts deployed yet</Text>
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.createButtonText, { color: colors.background }]}>Create New Contract</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={savedContracts}
          renderItem={renderContractItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Contract Details</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {selectedContract && (
              <ScrollView style={styles.contractDetails}>
                <View style={styles.detailSection}>
                  {renderSectionHeader("General Information", "general")}
                  {expandedSections.general && (
                    <>
                      <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: colors.secondary }]}>Title:</Text>
                        <Text style={[styles.detailValue, { color: colors.text }]}>{selectedContract.title}</Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: colors.secondary }]}>Type:</Text>
                        <Text style={[styles.detailValue, { color: colors.text }]}>
                          {getAgreementTypeLabel(selectedContract.agreementType)}
                        </Text>
                      </View>
                      <View style={styles.detailItem}>
                        <Text style={[styles.detailLabel, { color: colors.secondary }]}>Created:</Text>
                        <Text style={[styles.detailValue, { color: colors.text }]}>
                          {formatDate(selectedContract.createdAt)}
                        </Text>
                      </View>
                    </>
                  )}
                </View>

                <View style={styles.detailSection}>
                  {renderSectionHeader("Description", "description")}
                  {expandedSections.description && (
                    <Text style={[styles.descriptionText, { color: colors.text }]}>{selectedContract.description}</Text>
                  )}
                </View>

                <View style={styles.detailSection}>
                  {renderSectionHeader("Parties Involved", "parties")}
                  {expandedSections.parties &&
                    selectedContract.parties.map((party, index) => (
                      <View
                        key={index}
                        style={[styles.partyCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                      >
                        <Text style={[styles.partyTitle, { color: colors.text }]}>Party {index + 1}</Text>
                        <View style={styles.partyDetail}>
                          <Text style={[styles.partyLabel, { color: colors.secondary }]}>Name:</Text>
                          <Text style={[styles.partyValue, { color: colors.text }]}>{party.name}</Text>
                        </View>
                        <View style={styles.partyDetail}>
                          <Text style={[styles.partyLabel, { color: colors.secondary }]}>Email:</Text>
                          <Text style={[styles.partyValue, { color: colors.text }]}>{party.email}</Text>
                        </View>
                        {party.address && (
                          <View style={styles.partyDetail}>
                            <Text style={[styles.partyLabel, { color: colors.secondary }]}>Address:</Text>
                            <Text style={[styles.partyValue, { color: colors.text }]}>{party.address}</Text>
                          </View>
                        )}
                      </View>
                    ))}
                </View>

                <View style={styles.detailSection}>
                  {renderSectionHeader("Blockchain Information", "blockchain")}
                  {expandedSections.blockchain && (
                    <>
                      <View style={styles.hashContainer}>
                        <Hash size={18} color={colors.primary} style={styles.hashIcon} />
                        <Text style={[styles.hashLabel, { color: colors.text }]}>Contract Hash:</Text>
                      </View>
                      <Text style={[styles.hashValue, { color: colors.primary, backgroundColor: colors.card }]}>
                        {getContractHash(selectedContract)}
                      </Text>
                      <View style={styles.statusContainer}>
                        <View style={[styles.statusBadge, { backgroundColor: colors.accent }]}>
                          <Text style={[styles.statusText, { color: colors.background }]}>Deployed</Text>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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
  contractMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  contractDate: {
    fontSize: 12,
    marginLeft: 4,
  },
  chevronContainer: {
    justifyContent: "center",
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
  createButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderRadius: 12,
    width: "90%",
    maxHeight: "80%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  contractDetails: {
    padding: 16,
  },
  detailSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    width: 80,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  partyCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  partyTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  partyDetail: {
    flexDirection: "row",
    marginBottom: 6,
  },
  partyLabel: {
    fontSize: 14,
    width: 60,
  },
  partyValue: {
    fontSize: 14,
    flex: 1,
  },
  hashContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  hashIcon: {
    marginRight: 8,
  },
  hashLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  hashValue: {
    fontSize: 14,
    padding: 12,
    borderRadius: 6,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: "row",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
})

export default DeployedContracts


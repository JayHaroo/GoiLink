import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"

const agreementTypes = [
  { id: "service", label: "Service Agreement" },
  { id: "employment", label: "Employment Contract" },
  { id: "rental", label: "Rental Agreement" },
  { id: "sale", label: "Sale Contract" },
  { id: "nda", label: "Non-Disclosure Agreement" },
  { id: "custom", label: "Custom Agreement" },
]

const AgreementTypes = ({ selectedType, onSelect }) => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      {agreementTypes.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.option,
            selectedType === type.id && [styles.selectedOption, { borderWidth: 2, borderColor: colors.primary }],
          ]}
          onPress={() => onSelect(type.id)}
        >
          <View
            style={[
              styles.radio,
              { borderColor: selectedType === type.id ? colors.primary : colors.border },
              selectedType === type.id && styles.selectedRadio,
            ]}
          >
            {selectedType === type.id && <View style={[styles.radioInner, { backgroundColor: colors.primary }]} />}
          </View>
          <Text style={[styles.optionText, { color: selectedType === type.id ? colors.primary : colors.text }]}>
            {type.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    marginBottom: 8,
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  selectedOption: {
    borderRadius: 8
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedRadio: {
    borderColor: "transparent",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 14,
  },
})

export default AgreementTypes


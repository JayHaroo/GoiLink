import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"

const PartyInput = ({ index, party, updateParty, removeParty, isRemovable }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Party {index + 1}</Text>
        {isRemovable && (
          <TouchableOpacity style={styles.removeButton} onPress={() => removeParty(index)}>
            <Text style={{ color: colors.error }}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          value={party.name}
          onChangeText={(text) => updateParty(index, "name", text)}
          placeholder="Enter full name"
          placeholderTextColor={colors.secondary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          value={party.email}
          onChangeText={(text) => updateParty(index, "email", text)}
          placeholder="Enter email address"
          placeholderTextColor={colors.secondary}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.label, { color: colors.text }]}>Address</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
          value={party.address}
          onChangeText={(text) => updateParty(index, "address", text)}
          placeholder="Enter physical address"
          placeholderTextColor={colors.secondary}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    padding: 4,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 15,
  },
})

export default PartyInput


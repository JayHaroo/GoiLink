import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LocalTrans() {
    const route = useRoute();
    const navigation = useNavigation();
    
    // Retrieve contract hash from Form.tsx
    const contractHash = route.params?.contractHash || "No hash provided";

    const handleConfirm = async () => {
        try {
            // Get existing contracts from storage
            const storedContracts = await AsyncStorage.getItem("localContracts");
            const contracts = storedContracts ? JSON.parse(storedContracts) : [];

            // Add new contract hash
            contracts.push(contractHash);

            // Save updated contracts list
            await AsyncStorage.setItem("localContracts", JSON.stringify(contracts));

            console.log("Local contract saved:", contractHash);
            alert("Local contract saved successfully!");

            navigation.goBack();
        } catch (error) {
            console.error("Error saving contract:", error);
            alert("Failed to save contract.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Local Contract Created</Text>
            <Text style={styles.hash}>Hash: {contractHash}</Text>

            <View style={styles.buttonContainer}>
                <Pressable onPress={handleConfirm} style={styles.button}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
                
                <Pressable onPress={() => navigation.goBack()} style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    hash: {
        fontSize: 16,
        color: 'white',
        marginBottom: 30,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 15
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});

import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LocalTransactions() {
    const [contracts, setContracts] = useState<string[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        // Load stored contracts on mount
        const loadContracts = async () => {
            try {
                const storedContracts = await AsyncStorage.getItem("localContracts");
                if (storedContracts) {
                    setContracts(JSON.parse(storedContracts));
                }
            } catch (error) {
                console.error("Error loading contracts:", error);
            }
        };
        loadContracts();
    }, []);

    const clearContracts = async () => {
        try {
            await AsyncStorage.removeItem("localContracts");
            setContracts([]);
            alert("All local contracts deleted!");
        } catch (error) {
            console.error("Error clearing contracts:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stored Local Contracts</Text>

            {contracts.length > 0 ? (
                <FlatList
                data={contracts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.contractItem}>
                        <Text style={styles.contractText}>Title: {item.title}</Text>
                        <Text style={styles.contractText}>Hash: {item.hash}</Text>
                    </View>
                    )}
                />
            ) : (
                <Text style={styles.noData}>No local contracts found.</Text>
            )}

            <View style={styles.buttonContainer}>
                <Pressable onPress={clearContracts} style={[styles.button, { backgroundColor: "red" }]}>
                    <Text style={styles.buttonText}>Clear All</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: "white",
        marginBottom: 20,
        fontWeight: "bold",
    },
    contractItem: {
        backgroundColor: "#1a1a1a",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        width: "100%",
    },
    contractText: {
        color: "white",
        fontSize: 14,
    },
    noData: {
        color: "gray",
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 15,
        marginTop: 20,
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});

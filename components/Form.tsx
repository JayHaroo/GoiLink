import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { deployContract } from "./functions/confirm";

export default function Form() {
    const navigation = useNavigation();
    
    // State variables for input fields
    const [wallet1, setWallet1] = useState("");
    const [wallet2, setWallet2] = useState("");
    const [contractTitle, setContractTitle] = useState("");
    const [contractDescription, setContractDescription] = useState("");
    const [selectedId, setSelectedId] = useState<string | undefined>('1');
    
    // Agreement type mapping based on selectedId
    const agreementTypes = {
        '1': 'Normal',
        '2': 'Meet-Up',
        '3': 'Proof'
    };
    const agreementType = agreementTypes[selectedId || '1']; 

    const handleDeploy = async () => {
        try {
            if (!wallet1 || !wallet2 || !contractTitle || !contractDescription) {
                alert("Please fill in all fields!");
                return;
            }

            const contractAddress = await deployContract(wallet1, wallet2, contractTitle, contractDescription, agreementType);
            alert(`Contract deployed at: ${contractAddress}`);
        } catch (error) {
            alert("Error deploying contract!");
        }
    };

    const handleLocalContract = () => {
        const localHash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log("Local Contract Hash:", localHash);
        
        navigation.navigate('LocalTrans', { contractTitle: contractTitle ,contractHash: localHash});
    };

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        { id: '1', label: 'Normal', value: 'option1', borderColor: 'white', color: 'white', labelStyle: { color: 'white' } },
        { id: '2', label: 'Meet-Up', value: 'option2', borderColor: 'white', color: 'white', labelStyle: { color: 'white' } },
        { id: '3', label: 'Proof', value: 'option3', borderColor: 'white', color: 'white', labelStyle: { color: 'white' } },
    ]), []);

    return (
        <>
            <View style={styles.container}>
                <View style={{ marginTop: 40, width: 350, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ resizeMode: 'contain', height: 20, width: 120 }} />
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={{ color: 'white', fontSize: 20, textDecorationLine: 'underline' }}>Go back</Text>
                    </Pressable>
                </View>

                <View style={{ borderColor: 'white', borderWidth: 1, width: 350, marginTop: 20, marginBottom: 20 }} />

                <TextInput style={styles.inputs} placeholder="Enter Wallet Address 1" placeholderTextColor={'white'} 
                    value={wallet1} onChangeText={setWallet1} />
                <TextInput style={styles.inputs} placeholder="Enter Wallet Address 2" placeholderTextColor={'white'} 
                    value={wallet2} onChangeText={setWallet2} />

                <TextInput style={styles.inputs} placeholder="Contract Title" placeholderTextColor={'white'} 
                    value={contractTitle} onChangeText={setContractTitle} />
                <TextInput placeholder="Contract Description" placeholderTextColor={'white'} multiline={true} numberOfLines={10}
                    style={styles.textArea} value={contractDescription} onChangeText={setContractDescription} />

                <Text style={{ color: 'white', padding: 10 }}> Type of Agreement: </Text>
                <RadioGroup radioButtons={radioButtons} onPress={setSelectedId} selectedId={selectedId}
                    containerStyle={{ alignItems: 'flex-start', width: 250 }} />

                <View style={{ flexDirection: 'row', marginTop: 50, gap: 15 }}>
                    <Pressable onPress={handleDeploy} style={styles.button}>
                        <Text style={styles.buttonText}>Process to blockchain</Text>
                    </Pressable>

                    <Pressable onPress={handleLocalContract} style={[styles.button, { backgroundColor: 'blue' }]}>
                        <Text style={styles.buttonText}>Process to local</Text>
                    </Pressable>
                </View>
            </View>
            <StatusBar style='light' />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center'
    },
    inputs: {
        borderWidth: 1,
        borderColor: 'white',
        width: 250,
        borderRadius: 15,
        color: 'white',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    textArea: {
        borderWidth: 1,
        borderColor: 'white',
        width: 250,
        height: 200,
        maxHeight: 200,
        borderRadius: 15,
        color: 'white',
        textAlignVertical: 'top',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    button: {
        backgroundColor: 'green',
        width: 120,
        alignItems: 'center',
        borderRadius: 15
    },
    buttonText: {
        padding: 10,
        color: 'white',
        textAlign: 'center'
    }
});

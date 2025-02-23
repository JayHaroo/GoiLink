import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground , Image , Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ModalTester from './modal';

export default function Landing() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <>
        <View style={styles.container}>
            <ImageBackground source={require('../assets/BG.png')}
             resizeMode='cover'
             style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
             }}>

                <Image 
                source={require('../assets/logo.png')}
                style={{
                    resizeMode: 'contain',
                    height: 40,
                    marginTop: 30
                }}/>

                <Pressable 
                    style={styles.connect_button} 
                    onPress={() => setModalVisible(true)}>
                    <View style={{padding: 5, flexDirection:'row', alignItems: 'center'}}>
                        <Image
                        source={require('../assets/metamask-icon.png')}
                        style={{
                            resizeMode: 'contain',
                            height: 50,
                            width: 50,
                        }}/>

                        <Text style={{color:'orange'}}> Connect Metamask Wallet </Text>
                    </View>
                </Pressable>

                <Pressable 
                 style={styles.local_button}
                 onPress={() => navigation.navigate('Form')}>
                    <View style={{padding: 5, flexDirection:'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 35}}>🚀</Text>
                        <Text style={{color:'white', padding: 10}}> Create a Local Ledger </Text>
                    </View>
                </Pressable>

                <Pressable 
                 style={styles.local_button}
                 onPress={() => navigation.navigate('LocalTransactions')}>
                    <View style={{padding: 5, flexDirection:'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 35}}>🚀</Text>
                        <Text style={{color:'white', padding: 10}}> Deployed Ledgers </Text>
                    </View>
                </Pressable>

                {/* Modal Component */}
                <ModalTester isModalVisible={isModalVisible} setModalVisible={setModalVisible} />

            </ImageBackground>
        </View>
        <StatusBar style='light'/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    connect_button: {
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 15,
        marginTop: 100,
    },
    local_button: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 15,
        marginTop: 20,
    }
});

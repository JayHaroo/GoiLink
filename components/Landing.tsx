import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground , Image , TouchableHighlight, Pressable } from 'react-native';
import Svg from 'react-native-svg';

export default function Landing(){
    return(
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

                <Pressable style={styles.connect_button}>
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

            </ImageBackground>
        </View>
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
    }
});
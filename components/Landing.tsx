import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground , TouchableHighlight } from 'react-native';

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

                <TouchableHighlight style={styles.connect_button}>
                    <Text style={{color:'orange', padding: 10}}> Connect Metamask Wallet </Text>
                </TouchableHighlight>

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
        marginTop: 100
    }
});
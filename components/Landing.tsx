import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Landing(){
    return(
        <>
        <View style={styles.container}>
            <Image 
             source={require('../assets/logo.png')}
             style={{
                resizeMode: 'contain',
                height: 40,
                marginTop: 30
             }}/>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center'
    }
});
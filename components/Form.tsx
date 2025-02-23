import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Form() {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View
         style={{marginTop: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>

             <Image 
                source={require('../assets/logo.png')}
                style={{
                 resizeMode: 'contain',
                 height: 20,
                 width: 150
             }}/>

            <Pressable onPress={() => navigation.navigate('Landing')}>
             <Text 
              style={{
                color:'white', 
                fontSize: 20, 
                textDecorationLine:'underline',
                marginRight: 10}}>
                Go back</Text>
            </Pressable>

        </View>
      </View>
      <StatusBar style='light'/>
    </>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000000'
    }
});

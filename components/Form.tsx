import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

export default function Form() {

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', 
            label: 'Normal',
            value: 'option1',
            borderColor: 'white',
            color: 'white',
            labelStyle: { color: 'white' } // Ensures text is visible
        },
        {
            id: '2',
            label: 'Meet-Up',
            value: 'option2',
            borderColor: 'white',
            color: 'white',
            labelStyle: { color: 'white' } // Ensures text is visible
        },
        {
            id: '3',
            label: 'Proof',
            value: 'option3',
            borderColor: 'white',
            color: 'white',
            labelStyle: { color: 'white' } // Ensures text is visible
        },
    ]), []);
    

  const [selectedId, setSelectedId] = useState<string | undefined>('1');

  const [isLogin, setIsLogin] = useState(false); // Corrected state declaration
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <View style={{ marginTop: 40, width: 350, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image 
            source={require('../assets/logo.png')}
            style={{
              resizeMode: 'contain',
              height: 20,
              width: 120
          }}/>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{ color:'white', fontSize: 20, textDecorationLine:'underline' }}>
              Go back
            </Text>
          </Pressable>
        </View>
            
        <View style={{ borderColor: 'white', borderWidth: 1, width: 350, marginTop: 20 }} />

        <Text style={{ color: 'white' , fontSize: 20 , marginTop: 10, marginBottom: 30}}> Account Connected?: {isLogin.toString()} </Text>

        <TextInput style={styles.inputs} placeholder="Enter Wallet Address 1" placeholderTextColor={'white'}/>
        <TextInput style={styles.inputs} placeholder="Enter Wallet Address 2" placeholderTextColor={'white'}/>

        <TextInput style={styles.inputs} placeholder="Contract Title" placeholderTextColor={'white'}/>
        <TextInput 
         placeholder="Contract Description" 
         placeholderTextColor={'white'} 
         multiline={true} numberOfLines={10}
         style={{
            borderWidth: 1,
            borderColor: 'white',
            width: 250,
            height: 200,
            maxHeight: 200,
            borderRadius: 15,
            color: 'white',
            textAlignVertical: 'center'
         }}/>

         <Text style={{color: 'white', padding: 10}}> Type of Agreement: </Text>
         <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{ alignItems: 'flex-start', width: 250 }}
        />

        <Pressable
         style={{ 
            backgroundColor: 'green',
            width: 100,
            alignItems: 'center',
            marginTop: 50,
            borderRadius: 15
         }}>
            <Text style={{ padding: 10, color:'white'}}>Process!</Text>
         </Pressable>

      </View>
      <StatusBar style='light'/>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center'
  },
  inputs:{
    borderWidth: 1,
    borderColor: 'white',
    width: 250,
    borderRadius: 15,
    color: 'white',
    marginBottom: 15,
  },
});

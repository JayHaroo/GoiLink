import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from './components/Landing';
import Form from './components/Form';

// For managing the screens
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Form" component={Form} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>

  );
}
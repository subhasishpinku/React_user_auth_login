import { StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
// import firebase from 'firebase/app';
// import 'firebase/auth';
//https://reactnavigation.org/docs/getting-started/
//npm install @react-navigation/native
//npm install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack
//npm install @react-navigation/bottom-tabs
//npm install axios
//npm install firebase
//npm install @react-native-firebase/auth
// Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'AIzaSyCeEQuPqMv8-rYB4D7VvymMG7SL2hXzUzA',
//   authDomain: '',
//   projectId: 'react-native-course-353be',
//   // Add other Firebase config properties
// };

// firebase.initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
 const authCtx = useContext(AuthContext)
  return (
    <NavigationContainer>
   {!authCtx.isAuthenticated && <AuthStack />}
   {authCtx.isAuthenticated && <AuthenticatedStack />}
   </NavigationContainer>
    );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
      <Navigation />
     </AuthContextProvider>
    </>
  );
}
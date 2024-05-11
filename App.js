import { StyleSheet, Text, View } from 'react-native';
import { useContext , useEffect, useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppLoading from 'expo-app-loading';
// import { AppLoading } from 'expo';

import LoginScreen from './screens/LoginScreen';
import { SplashScreen } from 'expo-splash-screen'

import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
// import firebase from 'firebase/app';
// import 'firebase/auth';
//https://reactnavigation.org/docs/getting-started/
//npm install @react-navigation/native
//npm install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack
//npm install @react-navigation/bottom-tabs
//npm install axios
//npm install firebase
//npm install @react-native-async-storage/async-storage
//npm install @react-native-firebase/auth
//npm install expo-app-loading is derecated 
//npm install expo-splash-screen
//npx expo-doctor 
//npx expo-doctor --fix-dependencies
//npx expo install --check
//npm uninstall expo-app-loading
//expo upgrade
//expo --version
//npm install -g expo-cli
//expo upgrade 51.0.0

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'AIzaSyCeEQuPqMv8-rYB4D7VvymMG7SL2hXzUzA',
//   authDomain: '',
//   projectId: 'react-native-course-353be',
//   // Add other Firebase config properties
// };

// firebase.initializeApp(firebaseConfig);

//build apk command 
// npm install -g eas-cli  
// eas build:configure
// eas build -p android --profile preview
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
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }} >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor}) => <IconButton  
        icon="exit" color={tintColor} 
        size={24} onPress={authCtx.logout}/>
      }} />
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
function Root(){
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken(){
    const storedToken = await AsyncStorage.getItem('token');
    if(storedToken){
      authCtx.authenticate(storedToken);
    }
    setIsTryingLogin(false);
    }
    fetchToken();
   }, []);

   if(isTryingLogin){
    //  return <SplashScreen />
   }
  return   <Navigation /> 
}
export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
       <Root />
     </AuthContextProvider>
    </>
  );
}
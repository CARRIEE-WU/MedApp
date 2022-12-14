import React from 'react';
import { NavigationContainer, useNavigation, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, LogBox  } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Login from './screens/Login';
import Home from './screens/Home';
import Header from './components/Header';
import Scanner from './screens/Scanner';
import Scannertwo from './screens/Scannertwo';
import ScannerPatient from './screens/ScannerPatient';
import ScannerMedbag from './screens/ScannerMedbag';

import {user_name} from './global';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const Stack = createStackNavigator();

function App() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: () => <Header name="Login" />,
          headerStyle: {
            height: 90,
            backgroundColor: '#ED8B80',
            elevation: 25,
          },
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Header name="Home" />,
          headerTitleStyle: { alignSelf: 'center', fontSize: 30 },
          headerStyle: {
            height: 90,
            backgroundColor: '#ED8B80',
            elevation: 25,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
              <Image
                resizeMode="cover"
                source={require('./assets/qrcode.png')}
                style={{ width: 40, height: 40, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-between',alignItems:'center',}}>
                <MaterialIcons
                  onPress={() => navigation.navigate('Login')}
                  name={'logout'}
                  size={40}
                  style={{ marginLeft: 10 }}
                />
                <Text style={{fontSize:30}}>{user_name}</Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name='Scanner' 
        component={Scanner}
        options={{
          headerTitle: () => <Header name="Scanner" />,
          headerStyle: {
            height: 90,
            backgroundColor: '#ED8B80',
            elevation: 25,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => navigation.navigate('Home')}
                name={'arrow-back'}
                size={40}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name='Scannertwo' 
        component={Scannertwo}
        options={{
          headerTitle: () => <Header name="Scannertwo" />,
          headerStyle: {
            height: 90,
            backgroundColor: '#ED8B80',
            elevation: 25,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => navigation.navigate('Home')}
                name={'arrow-back'}
                size={40}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name='ScannerPatient' 
        component={ScannerPatient}
        options={{
          headerTitle: () => <Header name="ScannerPatient" />,
          headerStyle: {
            height: 90,
            backgroundColor: '#ED8B80',
            elevation: 25,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => navigation.navigate('Home')}
                name={'arrow-back'}
                size={40}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name='ScannerMedbag'
        component={ScannerMedbag}
        options={{
          headerTitle: () => <Header name="ScannerMedbag" />,
          headerStyle: {
            height: 90,
            backgroundColor: '#ED8B80',
            elevation: 25,
          },
          headerLeft: () => (
            <TouchableOpacity>
              <MaterialIcons
                onPress={() => navigation.navigate('Home')}
                name={'arrow-back'}
                size={40}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

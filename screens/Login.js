import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from '../axios';
let global = require('../global');

const Login = (props) => {
  const navigation = useNavigation();
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const isFocused = useIsFocused();

  const login = async () => {
    setAccount('1234567');
    setPassword('12345678');
    if (account != null && password != null) {
      try {
        const res = await axios.post('/login', {
          "employee_id": account,
          "password": password
        });
  
        if (res.data.status == 200) {
          global.token = res.data.Authorization.type + ' ' + res.data.Authorization.token
          global.user_id = res.data.user.id;
          global.user_employee_id = res.data.user.employee_id;
          global.user_name = res.data.user.name;
          global.confirm_user_name =null,
          global.patient_no = null;
          global.prescription = null;
          global.prescription_date = '';
          global.confirm_employee_id = null;
          global.confirm_patient = null;
          global.bagbarcode = null;
          global.fconfirm = null
          navigation.navigate('Home')
        } else {
          Alert.alert('Login Failed')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            resizeMode="cover"
            source={require('./../assets/icon.png')}
            style={styles.image}
          />
          <Text style={{ fontSize: 16, color: '#030303', fontWeight: 'bold' }}>
            Account
          </Text>
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.textInput}
              placeholder="Emploee ID"
              onChangeText={text => setAccount(text)}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              color: '#030303',
              fontWeight: 'bold',
            }}>
            Password
          </Text>
          <View style={{ marginTop: 10 }}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />
          </View>
          
          <TouchableOpacity
            onPress={login}
            style={styles.button}>
            <Text
              style={{ fontSize: 16, color: '#ffffff', fontWeight: 'bold' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DCD7',
  },
  image: {
    marginTop:20,
    alignItems: 'center',
    marginBottom: 20,
    width: 120,
    height: 120,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 300,
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    height: 50,
    width: 150,
    backgroundColor: '#66AAC1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  textdevice: {
    fontSize: 16,
    marginTop: 10,
    color: '#030303',
  },
});

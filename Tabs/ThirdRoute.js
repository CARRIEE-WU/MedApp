import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { Box, HStack, Button } from 'native-base';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import global from '../global';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from '../axios';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const ThirdRoute = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  const getConfirmDetails = async () => {
    navigation.navigate('Scannertwo')
    if (global.confirm_employee_id != null) {
      try {
        const res = await axios.get('/users/'+global.confirm_employee_id);
        if (res.data.status == 200) {
          global.confirm_user_name = res.data.data.name;
        } else {
          console.log('fail')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const sentConfirmemployee = () => {
    Alert.alert('已確認確認員身分');
  }

  const cancelConfirm = () => {
    global.confirm_employee_id = null;
    global.confirm_user_name = null;
    Alert.alert('已取消送出，請重新掃描');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5DCD7' }}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>  
        <Box>
          <Box bg="#F1BCAE" p="2" m="2" rounded="xl" alignItems="center">
            <TouchableOpacity onPress={getConfirmDetails}>
              <Image
                resizeMode="cover"
                source={require('./../assets/barcode.png')}
                style={{ width: 80, height: 80 }}
              />
            </TouchableOpacity>
            <View style={styles.textcontainer2}>
              <Text style={styles.textfont}>確認員編號</Text>
            </View>
            <View style={styles.textcontainer}>
              <Text style={styles.textfont}>{global.confirm_employee_id}</Text>
            </View>
          </Box>
          <Box alignItems="center" mt="1">
            <HStack space={2}>
              <Button
                onPress={cancelConfirm}
                width="100"
                rounded="100"
                size="sm"
                backgroundColor="#65AAC0"
                _text={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                取消
              </Button>
              <Button
                onPress={sentConfirmemployee}
                width="100"
                rounded="100"
                size="sm"
                backgroundColor="#65AAC0"
                _text={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                完成
              </Button>
            </HStack>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ThirdRoute;

const styles = StyleSheet.create({
  textcontainer: {
    width: '60%',
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#FEF6DB',
    margin: 10,
  },
  textfont: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#030303',
    textAlign: 'center',
  },
  textcontainer2: {
    width: '30%',
    padding: 5,
    borderRadius: 20,
    margin: 5,
  },
});

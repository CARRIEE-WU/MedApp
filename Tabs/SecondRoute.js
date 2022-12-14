import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  Divider,
  Box,
  Flex,
  TextArea,
  Stack,
  Button,
  HStack,
  Center,
} from 'native-base';
import SecondAccordion from './../components/SecondAccordion';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import {CheckBox} from 'react-native-elements';
import axios from '../axios';
import { prescription_date, fconfirm, confirm_patient, patient_no, prescription, bagbarcode, confirm_employee_id, user_id } from '../global';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const SecondRoute = () => {
  const navigation = useNavigation();
  const [showContent, setShowContent] = useState(false);
  const [npo, setNpo] = useState(false);
  const [refuse, setRefuse] = useState(false);
  const [out, setOut] = useState(false);
  const [hold, setHold] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(null);
  const checkvalue = [];
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  var checkpatient = false;
  var patientget = false;
  var medlistcheck = false;
  var controled = false;
  var now = new Date();

  var pchecktime = now;
  var medbag = prescription_date[0]+prescription_date[1]+prescription_date[2]+prescription_date[3]
              +prescription_date[5]+prescription_date[6]+prescription_date[8]+prescription_date[9]
              +prescription_date[11]+prescription_date[12]+prescription_date[14]+prescription_date[15]
              +prescription_date[17]+prescription_date[18]+patient_no;
  if(patient_no != null){
    patientget = true;
  }else{
    patientget = false;
  }

  if (patient_no == confirm_patient && confirm_patient != null) {
    checkpatient = true;
  } else{
    checkpatient = false;
  }

  if(bagbarcode != null && bagbarcode == medbag.toString() ){
    medlistcheck = true;
  }else{
    medlistcheck = false;
  }
  
  const storeRemark = () => {
    if(npo === true){
      checkvalue.push("NPO");
    }
    if(refuse === true){
      checkvalue.push("拒絕");
    }
    if(out === true){
      checkvalue.push("OUT");
    }
    if(hold === true){
      checkvalue.push("HOLD");
    }
    Alert.alert("已儲存");
    checkvalue.pop();
  }

  const cancelRemark = () => {
    checkvalue.pop();
    setTextAreaValue('');
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  
  const postCheck = async () => {
    if(medlistcheck == false){
      Alert.alert('尚未掃描藥包');
    }
    else if(checkpatient == false){
      Alert.alert('尚未確認病患');
    }
    else if(controled == true && confirm_employee_id == null){
      Alert.alert('確認員尚未確認');
    }
    else{
      Alert.alert('已送出紀錄');
      try {
        const res = await axios.post('/check_histories', {
          "prescription_id": prescription.id,
          "user_id": user_id,
          "check_time": pchecktime,
          "remark": textAreaValue + checkvalue,
          "state": (textAreaValue != null && checkvalue != null) ? 0 : 1,
          "confirm_user_id": fconfirm,
        });
        //console.log(res)
        if (res.data.status == 200) {
          
        } else {        

        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  
  useEffect(() => {
    if (prescription){
      setData(prescription.medicines);
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Box>
          <Flex direction="row" p="2" mt="1" ml="2" alignItems="center">
            {patientget ?
              <Text
                style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FF0000',
                letterSpacing: 1,
                textAlign: 'center',
                }}>
                {prescription_date}
              </Text>:
              <></>}
            <Divider thickness="0" mx="auto" orientation="vertical" />
            <TouchableOpacity onPress={() => navigation.navigate('ScannerMedbag')}>
              <Image
                resizeMode="contain"
                source={require('./../assets/barcode.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Divider thickness="0" mx="1" orientation="vertical" />
          </Flex>

          <View style={styles.flatcontainer}>
            <View style={styles.comfirmcontainer}>
              <View style={styles.textContainer}>
                {checkpatient ? 
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#319C14',
                      fontWeight: 'bold',
                    }}>
                    已完成確認
                  </Text> :
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#FF0000',
                      fontWeight: 'bold',
                    }}>
                    請掃描確認病患身分
                  </Text>
                }
                <TouchableOpacity onPress={() => navigation.navigate('ScannerPatient')}>
                  <Image
                    resizeMode="contain"
                    source={require('./../assets/qrcode.png')}
                    style={{ width: 30, height: 30 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.comfirmcontainer}>
              <TouchableOpacity onPress={() => setShowContent(!showContent)}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>未給藥註記</Text>
                  <MaterialIcons name={'keyboard-arrow-right'} size={30} />
                </View>
              </TouchableOpacity>

              {showContent && (
                <Box alignItems="center" w="100%">
                  <Box alignItems="center">
                  <Stack direction={{
                    base: "row",
                    md: "row"
                    }} space={2} justifyContent="space-around">
                        <CheckBox
                          title="NPO"
                          checked={npo}
                          onPress={()=>setNpo(!npo)}
                          >
                        </CheckBox>
                        <CheckBox
                          title="拒絕"
                          checked={refuse}
                          onPress={()=>setRefuse(!refuse)}
                          >
                        </CheckBox>
                        <CheckBox
                          title="OUT"
                          checked={out}
                          onPress={()=>setOut(!out)}
                          >
                        </CheckBox>
                        <CheckBox
                          title="HOLD"
                          checked={hold}
                          onPress={()=>setHold(!hold)}
                          >
                        </CheckBox>
                      </Stack>
                  </Box>
                  <TextArea
                    h={40}
                    placeholder="請輸入註記"
                    w="100%"
                    fontSize="16"
                    value={textAreaValue}
                    onChangeText={text => setTextAreaValue(text)}
                  />
                  <Box alignItems="center" mt="1">
                    <HStack space={2}>
                      <Button
                        onPress={cancelRemark}
                        width="100"
                        rounded="100"
                        size="sm"
                        backgroundColor="#ECA881"
                        _text={{
                          color: '#030303',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        取消
                      </Button>
                      <Button
                        onPress={storeRemark}
                        width="100"
                        rounded="100"
                        size="sm"
                        backgroundColor="#C4ECD4"
                        _text={{
                          color: '#030303',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        儲存
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              )}
            </View>
            {medlistcheck ?
              data.map((item)=>{
                if(item.is_controlled == 1){
                  controled = true;
                }
                return(
                  <SecondAccordion 
                    key={item.id.toString()}
                    title={item.name}
                    control_drug={item.is_controlled}
                  />
                )
              }):<></>
            }
          </View>
          <Center style={styles.buttonpos}>
            <Button
                  onPress={postCheck}
                  width="100"
                  rounded="100"
                  size="sm"
                  backgroundColor="#65AAC0"
                  _text={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  送出
            </Button>
          </Center>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecondRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DCD7',
    paddingHorizontal: '1%',
    paddingVertical: '1%',
    marginBottom: '4%',
    height: '100%',
  },
  flatcontainer: {
    flex: 1,
    height: '100%',
    paddingBottom: 50,
  },
  comfirmcontainer: {
    width: '100%',
    padding: '2%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom: '2%',
    overflow: 'hidden',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#030303',
    fontWeight: 'bold',
  },
  buttonpos:{
    flex: 1,
    paddingBottom: 10,
  },
});

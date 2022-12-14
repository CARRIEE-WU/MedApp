import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
  Animated,
  LogBox,
} from 'react-native';
import {
  ConstraintSystem,
  ConstraintSystemView,
} from 'react-native-constraint-layout';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Divider, Box, Flex, Pressable } from 'native-base';

import FirstRoute from './../Tabs/FirstRoute';
import SecondRoute from './../Tabs/SecondRoute';
import ThirdRoute from './../Tabs/ThirdRoute';
import FourthRoute from './../Tabs/FourthRoute';
import global, { patient_no } from '../global';
import axios from '../axios';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
//LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const { height, weight } = Dimensions.get('window');
const initialLayout = {
  width: Dimensions.get('window').width,
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const Home = (props) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  // const [patientNo, setPatientNo] = useState('12345678');
  const [patientDetail, setPatientDetail] = useState({});
  const isFocused = useIsFocused();

  const [routes] = useState([
    {
      key: 'first',
      title: '備藥清單',
    },
    {
      key: 'second',
      title: '核藥紀錄',
    },
    {
      key: 'third',
      title: '確認員',
    },
    {
      key: 'fourth',
      title: '完成紀錄',
    },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row" bg="#B6D9D5" p="1" borderRadius="full">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const bg1 = index === i ? '#64AAC4' : '#8CC2CC';
          return (
            <Box
              bg={bg1}
              flex={1}
              alignItems="center"
              p="2"
              m="0.5"
              borderRadius="full"
              cursor="pointer">
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text style={{ color: '#ffffff', fontSize: 16 }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  const getPatientDetails = async () => {
    if (global.patient_no != null && (Object.keys(patientDetail).length === 0 || global.patient_no != patientDetail.patient_no)) {
      try {
        const res = await axios.get('/patients/' + global.patient_no, {
          headers:{
            Authorization: global.token
          }
        });
  
        if (res.data.status == 200) {
          setPatientDetail(res.data.data)
          global.prescription = res.data.data.latestPrescription
          global.prescription_date = res.data.data.latestPrescription.begin_at
        } else {
          console.log('fail')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
  console.log(global.patient_no)
  useFocusEffect(() => {
    getPatientDetails();
  });

  return (
    <ConstraintSystem style={styles.container}>
      <ConstraintSystemView>
        <NativeBaseProvider>
          <Box alignSelf="center">
            <Flex direction="row" h="12" pt="4">
              <Text style={styles.textinfo}>姓名:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.name}</Text>
              <Divider thickness="0" mx="3" orientation="vertical" />
              <Text style={styles.textinfo}>性別:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.gender}</Text>
              <Divider thickness="0" mx="3" orientation="vertical" />
              <Text style={styles.textinfo}>血型:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.blood_type}</Text>
            </Flex>
            <Flex direction="row" h="8">
              <Text style={styles.textinfo}>年齡:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.age}</Text>
              <Divider thickness="0" mx="3" orientation="vertical" />
              <Text style={styles.textinfo}>身高:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.height}</Text>
              <Divider thickness="0" mx="3" orientation="vertical" />
              <Text style={styles.textinfo}>體重:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.weight}</Text>
            </Flex>
            <Flex direction="row" h="8">
              <Text style={styles.textinfo}>生日:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.birthday}</Text>
            </Flex>
            <Flex direction="row" h="8">
              <Text style={styles.textinfo}>病歷號:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.patient_no}</Text>
              <Divider thickness="0" mx="3" orientation="vertical" />
              <Text style={styles.textinfo}>床號:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.bed_no}</Text>
            </Flex>
            <Flex direction="row" h="8">
              <Text style={styles.textinfo}>過敏史:</Text>
              <Divider thickness="0" mx="1" orientation="vertical" />
              <Text style={styles.info}>{patientDetail.allergy_history}</Text>
            </Flex>
          </Box>
          <Box w="100%" h={height - 230} mt="165">
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              style={{ marginTop: StatusBar.currentHeight }}
            />
          </Box>
        </NativeBaseProvider>
      </ConstraintSystemView>
    </ConstraintSystem>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DCD7',
  },
  textinfo: {
    fontSize: 16,
    color: '#030303',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  info: {
    textAlign: 'center',
    fontSize: 16,
    color: '#030303',
    letterSpacing: 1,
  },
});

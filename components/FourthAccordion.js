import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { VStack, Flex } from 'native-base';

const { height, width } = Dimensions.get('window');

const FourthAccordion = ({
  time,
  status,
  note,
  user,
  confirm_user,
  prescription
}) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        <View style={styles.titleContainer}>
          {status ?
            <MaterialIcons name={'check-circle'} size={30} />:
            <MaterialIcons name={'cancel'} size={30} />
          }
          <Text style={styles.title}>{prescription.begin_at}</Text>
          <Text style={styles.title}>{prescription.patient.patient_no}</Text>
          <Text style={styles.title}>{prescription.patient.name}</Text>
          <MaterialIcons name={'keyboard-arrow-right'} size={30} />
        </View>
      </TouchableOpacity>

      {showContent && (
        <View style={styles.body}>
          <VStack>
            <Flex direction="row" flexWrap="wrap" mb="2">
              {status ?
                <Text
                  style={{ fontSize: 16, color: '#319C14', fontWeight: 'bold' }}>
                  已完成供藥 {time}
                </Text>:
                <Text
                  style={{ fontSize: 16, color: '#FF0000', fontWeight: 'bold' }}>
                  未完成供藥 {time}
                </Text>
              }
            </Flex>
            <Flex direction="row" flexWrap="wrap" mb="2">
              {note != 'null' ?
                <Text style={styles.textinfo}>{note}</Text>:
                <></>
              }
            </Flex>
            <Flex direction="row" flexWrap="wrap">
              <Text style={styles.infotitle}>核藥員: </Text>
              <Text style={styles.textinfo}>{user.name} {user.employee_id}</Text>
            </Flex>
            <Flex direction="row" flexWrap="wrap">
              <Text style={styles.infotitle}>確認員: </Text>
              {confirm_user ?
                <Text style={styles.textinfo}>{confirm_user.name} {confirm_user.employee_id}</Text>:
                <></>
              }
            </Flex>
          </VStack>
        </View>
      )}
    </View>
  );
};

export default FourthAccordion;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '2%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom: '2%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    color: '#030303',
    fontWeight: 'bold',
  },
  body: {
    padding: '3%',
    width: width - 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infotitle: {
    fontSize: 16,
    color: '#030303',
    fontWeight: 'bold',
  },
  textinfo: {
    fontSize: 16,
    color: '#030303',
    fontWeight: 'medium',
  },
});

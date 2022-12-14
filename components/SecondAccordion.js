import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import global from '../global';

const SecondAccordion = ({ title , control_drug}) => {
  var iscontrol_drug = false;
  if(control_drug == 1){
    iscontrol_drug = true;
    global.fconfirm = 2;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {iscontrol_drug ?
          <MaterialIcons name={'priority-high'} size={30} /> :
          <MaterialIcons name={'check'} size={30} />
        }
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default SecondAccordion;

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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'99%',
  },
});

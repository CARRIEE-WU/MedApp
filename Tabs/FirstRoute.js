import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Divider, Box, Flex} from 'native-base';
import AccordionItem from './../components/AccordionItem';
import { ScrollView } from 'react-native-gesture-handler';
import { prescription, prescription_date, patient_no } from '../global';
import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const FirstRoute = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  var patientget = false;

  if(patient_no != null){
    patientget = true;
  }else{
    patientget = false;
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);
  
  useEffect(() => {
    if (prescription){
      setData(prescription.medicines);
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Box>
              <Flex direction="row" p="2" m="2" alignItems="center">
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
              </Flex>
            </Box>
            {
              data.map((item)=>{
                return(
                  <AccordionItem
                    key={item.id.toString()}
                    title={item.name}
                    efficacy={item.efficiency}
                    sideeffect={item.side_effect}
                    po={item.pivot.pres_po}
                    dose={item.pivot.dose}
                    image={item.image}
                    control_drug={item.is_controlled}
                  />
                )
              })
            }
        </ScrollView>
    </SafeAreaView>
  );
};

export default FirstRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5DCD7',
    paddingHorizontal: '1%',
    paddingVertical: '1%',
    marginBottom: '4%',
    height: '100%',
  },
});

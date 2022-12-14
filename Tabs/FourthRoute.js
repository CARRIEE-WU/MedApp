import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import FourthAccordion from '../components/FourthAccordion';
import { ScrollView } from 'react-native-gesture-handler';
import axios from '../axios';
import global from '../global';
import { useFocusEffect } from '@react-navigation/native';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const FourthRoute = () => {
  const [data, setData] = useState([]);
  const [patient_data, setPatientData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getcheckhistories();
    wait(500).then(() => setRefreshing(false));
  }, []);

  const getcheckhistories = async () => {
    try{
      const res = await axios.get('/check_histories?user_id='+global.user_id);
      if (res.data.status == 200) {
        //console.log('---------------check_history---------------')
        //console.log(res.data.data)
        setData(res.data.data);
      } else {
        console.log('fail')
      }
    } catch (err) {
      console.log(err)
    }
  }

  // const getpatientdata = async () => {
  //   try{
  //     const res = await axios.get('/check_histories/' + data.);
  //     if (res.data.status == 200) {
  //       console.log(res.data.data)
  //       global.checkhistory = res.data.data
  //       //setData(res.data.data)
  //     } else {
  //       console.log('fail')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  useEffect(() => {
    if (data.length === 0){   //如果我清光就改成!data
      getcheckhistories();
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {
          (data.map((item)=>{
            return(
              <FourthAccordion
                key={item.id.toString()}
                time={item.check_time}
                status={item.state}
                note={item.remark}
                user={item.user}
                confirm_user={item.confirm_user}
                prescription={item.prescription}
              />
            )})
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default FourthRoute;

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

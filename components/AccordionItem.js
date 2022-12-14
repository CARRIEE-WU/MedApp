import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  HStack, 
  Image, 
  VStack,
  Flex,
} from "native-base";

const {height, width} = Dimensions.get('window');

const AccordionItem = ({title, efficacy, sideeffect, po, dose, image, control_drug}) => {
  const [showContent, setShowContent] = useState(false);
  var iscontrol_drug = false;
  if(control_drug == 1){
    iscontrol_drug = true;
  }
  
  return(
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <MaterialIcons name={'keyboard-arrow-right'} size={30} />
        </View>
      </TouchableOpacity>

      {showContent && (
        <View style={styles.body}>
          <HStack space={2} justifyContent="flex-start">
            <Image size="lg" resizeMode="cover" borderRadius={20} source={{uri: 'http://140.136.151.66:8000/storage/' + image }} alt="Alternate Text"/>
              <VStack>
                <Flex direction="row" flexWrap="wrap">
                  <Text style={styles.infotitle}>藥效: </Text>
                  <Text style={styles.textinfo}>{efficacy}</Text>
                </Flex>
                <Flex direction="row" flexWrap="wrap">
                  <Text style={styles.infotitle}>副作用: </Text>
                  <Text style={styles.textinfo}>{sideeffect}</Text>
                </Flex>
                <Flex direction="row" flexWrap="wrap">
                  <Text style={styles.infotitle}>服用方法: </Text>
                  <Text style={styles.textinfo}>{po}</Text>
                </Flex>
                <Flex direction="row" flexWrap="wrap">
                  <Text style={styles.infotitle}>服用劑量: </Text>
                  <Text style={styles.textinfo}>{dose}</Text>
                </Flex>
                {iscontrol_drug ? 
                  <Flex direction="row" flexWrap="wrap">
                    <Text style={styles.controltitle}>管制藥物</Text>
                  </Flex> :
                  <></>
                }
              </VStack>
          </HStack>
        </View>
      )}
    </View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({
  container:{
    width: '100%',
    padding: '2%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom:'2%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    color: '#030303',
    fontWeight: 'bold',
  },
  body: {
    padding:'2%',
    width: width-150,
  },
  titleContainer: {
    flexDirection:'row',
    width:'99%',
    alignItems:'center',
    justifyContent:'space-between',
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
  controltitle: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
  },
})
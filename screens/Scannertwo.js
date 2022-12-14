import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import global from '../global';

const Scanner = ({ navigation: { goBack } }) =>{
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[]);

    if (hasPermission === null || hasPermission === false) {
        return <Text>No Access</Text>;
    }

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        global.confirm_employee_id = data;
        
        goBack();
    };

    return(
        <View style={styles.container}>
            <BarCodeScanner
                style={StyleSheet.absoluteFillObject}
                onBarCodeScanned={scanned  ? undefined : handleBarCodeScanned}
            />
            {scanned && <Button title='Scan again?' onPress={() => setScanned(false)} color='#66AAC1'/>}
        </View>
    );
}

export default Scanner;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F5DCD7',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
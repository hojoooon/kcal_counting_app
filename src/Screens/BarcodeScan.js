import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import AsyncStorage from "@react-native-community/async-storage";


export default function BarCodeScan(props) {
  const {foods, mealName, mealVal } = props.route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [food, setFood] = useState([])

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setFood(foods.filter(food => food.barcode === data))
    setVisible(true)
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRegist = async() => {
    // console.log(barcode)
    console.log(food);
    console.log(mealName);
    console.log(mealVal)
    // const diet = JSON.stringify(AsyncStorage.getItem(mealVal));
    // AsyncStorage.setItem(mealVal, diet += JSON.stringify(food))
    
    try {
      const diet = await AsyncStorage.getItem(mealVal);
      const dietParse = JSON.parse(diet);
      const foodList = food.concat(dietParse)
      console.log(foodList)
      await AsyncStorage.setItem(mealVal, JSON.stringify(foodList))
      alert('성공적으로 저장되었습니다!')
    } catch (e) {
      alert('음식이 등록되어있지 않습니다.')
      console.log(e)
    }
    setVisible(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backBtn}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          title="Dismiss"
          
        >
          <MaterialIcons 
            name="keyboard-arrow-left" 
            size={34} 
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.barcodeCam}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      {scanned && <Button 
        title={'탭해서 다시 스캔'} 
        color="#8400ff"
        onPress={() => setScanned(false)}
      />}
      </View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>음식 등록하기</Dialog.Title>
        <Dialog.Description>
          {food.name + '을 등록하시겠습니까?'}
        </Dialog.Description>
        <Dialog.Button label="취소" onPress={handleCancel} />
        <Dialog.Button label="등록" onPress={handleRegist} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: "#8400ff"
  },
  backBtn:{
    flex: 0.14,
    top: 50,
    // width: 50,
    // height: 50,
    backgroundColor: "#8400ff"
  },
  barcodeCam: {
    flex: 1,
    justifyContent: "center"
  }
});
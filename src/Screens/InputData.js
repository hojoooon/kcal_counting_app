import React, { useState } from "react";
import { 
  View , 
  Text, 
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar
  } from "react-native";
import {CheckBox} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";


export default function InputData(props) {
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const user = [gender, age, height, weight]
  const userInform = JSON.stringify(user);

  const saveData = async userInform => {
    try {
      await AsyncStorage.setItem('userInform', userInform);
      console.log(userInform)
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  const getData = async () => {
    let userInform = '';
    try {
      userInform = await AsyncStorage.getItem('userInform') || 'none';
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    return userInform;
  }
  const data = getData().then((userInform) => {
    return userInform
  })
  function dataCheck() {
    getData().then((userInform) => {
      if(userInform != 'none'){
        console.log('Horraayyy!!!')
        console.log(userInform)
      }else if(userInform === 'none'){
        console.log('nooooo')
      }
    })
  }
  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('userInform');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  // static defaultProps = {
  //   onPress: () => null
  // }
  // constructor(){
  //   super();
  //   this.state = {
  //     User: {
  //       selectedSex: "",
  //       age: "",
  //       height: "",
  //       weight: ""
  //     }
  //   }
  // }
  // userInform = JSON.stringify(this.state);

  // _changeAge=(value) => {
  //   this.setState({age:value});
  // }
  // _changeHeight=(value) => {
  //   this.setState({height:value});
  // }
  // _changeWeight=(value) => {
  //   this.setState({weight:value});
  // }
  // _saveData = async userInform => {
  //   try {
  //     await AsyncStorage.setItem('userInform', userInform);
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log(error.message);
  //   }
  // }
  // render(){
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={styles.topPart}>
          <Text style={styles.topText}>신체정보 입력페이지</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.genderPart}>
            <CheckBox 
              checked={gender === "male"}
              onPress={() => setGender("male")}
              style={styles.checkBox}
              color = "#8400ff" 
            />
            <Text style={styles.dataText}>남성</Text>
            <CheckBox 
              checked={gender === "female"}
              onPress={() => setGender("female")}
              style={styles.checkBox}
              color = "#8400ff"
            />
            <Text style={styles.dataText}>여성</Text>
          </View>
          <View style={styles.agePart}>
            <Text style={styles.dataText}>나이:</Text>
            <TextInput 
              placeholder="세"
              style={styles.input}
              keyboardType="numbers-and-punctuation"
              onChangeText={(value) => setAge(value)}
            />
          </View>
          <View style={styles.heightPart}>
            <Text style={styles.dataText}>키:</Text>
            <TextInput 
              placeholder="cm" 
              style={styles.input}
              keyboardType="numbers-and-punctuation"
              onChangeText={(value) => setHeight(value)}
            />
          </View>
          <View style={styles.weightPart}>
            <Text style={styles.dataText}>몸무게:</Text>
            <TextInput 
              placeholder="kg"
              style={styles.input}
              keyboardType="numbers-and-punctuation"
              onChangeText={(value) => setWeight(value)}
            />
          </View>
          <View style={styles.btnPart}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={
                () => saveData(userInform)
              }
            >
              <Text style={styles.submit}>완료</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => dataCheck()}
            >
              <Text style={styles.submit}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => deleteData()}
            >
              <Text style={styles.submit}>제거</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center"
  },
  topPart:{
    flex: 0.75,
    backgroundColor: "#8400ff",
    alignItems: "stretch",
    justifyContent: "flex-end"
  },
  topText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
    paddingBottom: 10
  },
  dataContainer: {
    flex: 5,
    alignItems: "center",
    marginBottom: 24
  },
  dataText: {
    fontSize: 20,
    marginRight: 30
  },
  input: {
    height: 28,
    marginLeft: 30 ,
    fontSize: 20,
    
  },
  genderPart: {
    flex: 1,
    marginTop: 100,
    alignItems: "stretch",
    flexDirection: "row"
  },
  checkBox:{
    marginRight: 17
  },
  agePart: {
    flex: 1,
    flexDirection: "row"
  },
  heightPart: {
    flex: 1,
    flexDirection: "row",
  },
  weightPart: {
    flex: 1,
    flexDirection: "row"
  },
  btnPart: {
    flex: 0.7  
  },
  submitBtn: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8400ff',
    position: "relative",
    width: 190,
    borderRadius: 30
  },
  submit: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600"
  }
})
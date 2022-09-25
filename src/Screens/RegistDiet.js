import React from "react";
import { 
  View,
  StyleSheet,
  Modal,
  FlatList,
  Text
} from "react-native";
import {SearchBar} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import AsyncStorage from "@react-native-community/async-storage";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default class RegistDiet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      foods:[],
      search: "",
      breakfast: [],
      lunch: [],
      dinner: []
    }
  }
  componentDidMount(){
    if(!firebase.apps.length){
      firebase.initializeApp({
        apiKey: "AIzaSyCGV1c3aFMTFnh1KEQx9hBSLNNcXYtUmmA",
        authDomain: "healthapp-8612c.firebaseapp.com",
        databaseURL: "https://healthapp-8612c.firebaseio.com",
        projectId: "healthapp-8612c",
        storageBucket: "healthapp-8612c.appspot.com",
        messagingSenderId: "927785103257",
        appId: "1:927785103257:web:9b0de2148baa968bd02d08",
        measurementId: "G-J9L5WLP44T"
      });
    }
    const ref = firebase.database().ref();

    ref.on("value", (snapshot) => {
      var li = []
      snapshot.forEach((child) => {
        li.push({
          key: child.key,
          name: child.val().foodName,
          servingSize: child.val().servingSize,
          energy: child.val().energy,
          protein: child.val().protein,
          lipid: child.val().lipid,
          carbohydrate: child.val().carbohydrate,
          totalSugers: child.val().totalSugers,
          salt: child.val().salt,
          cholesterol: child.val().cholesterol,
          barcode: child.val().barcode
        })
      })
      this.setState({foods: li})
      
    });
  }

  registFood = ({dietList, item}) => {
    // dietList.concat({id: item.key, name: item.name, energy: item.energy})
    console.log(dietList)
  }

  updateDiet(listname, diet)  {
    if(listname === "breakfast") {
      this.setState({breakfast: [...this.state.breakfast, diet]})
      console.log(diet.name)
    }else if(listname === "lunch") {
      this.setState({lunch: [...this.state.lunch, diet]})
    } else if(listname === "dinner") {
      this.setState({dinner: [...this.state.dinner, diet]})
    }
  }
  
  updateSearch = (search) => {
    this.setState({ search })
  }

  render(){
    const {diet} = this.props.route.params;
    // const {updateDiet} = this.props.state.params;
    const breakfast = this.state.breakfast;
    const lunch = this.state.lunch;
    const dinner = this.state.dinner;

    const saveDiet = async (meal) => {
      if(meal === "breakfast"){
        try {
          const breakfastDiet = await AsyncStorage.getItem('breakfast');
          const parseBreakfast = JSON.parse(breakfastDiet);
          const breakfastList = breakfast.concat(parseBreakfast)
          await AsyncStorage.setItem("breakfast", JSON.stringify(breakfastList))
          alert('성공적으로 저장되었습니다!')
        } catch (e) {
          alert('Failed to save the data to the storage')
          console.log(e)
        }
      } else if(meal === "lunch"){
        try {
          const lunchDiet = await AsyncStorage.getItem("lunch");
          const parseLunch = JSON.parse(lunchDiet);
          const lunchList = lunch.concat(parseLunch)
          await AsyncStorage.setItem("lunch", JSON.stringify(lunchList))
          alert('성공적으로 저장되었습니다!')
        } catch (e) {
          alert('Failed to save the data to the storage')
          console.log(e)
        }
      } else if(meal === "dinner"){
        try {
          const dinnerDiet = await AsyncStorage.getItem("dinner");
          const parseDinner = JSON.parse(dinnerDiet);
          const dinnerList = dinner.concat(parseDinner)
          await AsyncStorage.setItem("dinner", JSON.stringify(dinnerList))
          alert('성공적으로 저장되었습니다!')
        } catch (e) {
          alert('Failed to save the data to the storage')
          console.log(e)
        }
      }
    }
    return(
      <View style={styles.modalView}>
        <View style={styles.topPart}>
          <View style={styles.btnPickerPart}>
            <View style={styles.btnPart}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                title="Dismiss"
              >
                <MaterialIcons 
                  name="keyboard-arrow-left" 
                  size={34} 
                  color="#fff"
                  style={styles.hideBtn}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mealNamePart}>
              <Text style={styles.mealName} >{diet.name}</Text>
            </View>
            <View style={styles.btnPart}>
              <TouchableOpacity
                onPress={() => saveDiet(diet.value)}
                title="Go home"
              >
                <Text style={styles.saveBtn}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchBarPart}>
            <SearchBar
              placeholder="등록할 음식을 입력해주세요"
              onChangeText={this.updateSearch}
              value={this.state.search}
              lightTheme="true"
              round="true"
              platform="ios"
              inputContainerStyle={{height: 20}}
              containerStyle={{height: 50}}
            />
          </View>
        </View>
        <View style={styles.foodListPart}>
          <FlatList
            data={this.state.foods}
            windowSize={1}
            style={{ flex: 1, width: "100%" }}
            renderItem={({item}) => (
              <View
                key={item.key}
                style={styles.flatList}
              >
                <TouchableOpacity
                  onPress={() => this.updateDiet(diet.value, item)}
                >
                    <View style={styles.foodList}>
                      <View style={styles.foodInfoPart}>
                        <View style={styles.namePart}>
                          <Text style={{...styles.listStyle, ...styles.nameFont }}>{item.name}</Text>
                        </View>
                        <View style={styles.detailPart}>
                          <Text style={{...styles.listStyle, ...styles.servingSizeFont}} >1회 제공량({item.servingSize}g)</Text>
                          <Text style={{...styles.listStyle, ...styles.energyFont}} >{item.energy}kcal</Text>
                        </View>
                      </View>
                      <View style={styles.iconPart}>
                        <MaterialCommunityIcons 
                          name="plus" 
                          size={24} 
                          color="black" 
                        />
                      </View>
                    </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>
        <View style={styles.barcodeBtnPart}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Barcode", {foods: this.state.foods, mealName:diet.name, mealVal:diet.value})}
          >
            <Entypo 
              name="camera"
              size={28}
              color="#fff"
              style={styles.barcodeBtn}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "#8400ff"
  },
  topPart: {
    width: "100%",
    // alignItems: "flex-end",
    top: 40,
    flex: 2.2
  },
  btnPickerPart: {
    flexDirection: 'row',
    alignItems: "flex-end",
    // backgroundColor: "red"
  },
  btnPart:{
    flex: 1
  },
  hideBtn: {
    top: 16,
    left: 5
  },
  mealNamePart: {
    flex: 8,
    justifyContent: "center",
    flexDirection: "row"
  },
  mealName: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    top: 8,
  },
  saveBtn: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    right: 10,
    top: 8
  },
  searchBarPart:{
    flexDirection: "column",
    justifyContent:"flex-end",
    marginTop: 24
  },
  foodListPart:{
    flex: 10,
    backgroundColor: "#fff",
    alignContent: "center",
    width: "100%"
  },
  openButton: {
    flex: 3
  },
  flatList:{
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#fff"
  },
  foodList: {
    alignItems:"flex-start",
    flexDirection: "row",
    justifyContent:"space-between",
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1.5
  },
  foodInfoPart:{
    justifyContent: "flex-end"
  },
  namePart:{

  },
  detailPart: {
    flexDirection: "row"
  },
  iconPart: {
    padding: 15
  },
  listStyle: {
    // textAlign: "center",
    padding: 5,
    
  },
  nameFont: {
    fontSize: 16
  },
  servingSizeFont: {
    color: "#a94dff"
  },
  energy: {

  },
  barcodeBtnPart: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    // justifyContent: "flex-end",
    backgroundColor: "#8400ff",
    width: 60,
    height: 60,
    top: 720,
    left: 300,
    borderRadius: 30,
  },
  barcodeBtn: {
    textAlign: "center",
    top: 15
  }
})
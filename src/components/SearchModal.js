import React from "react";
import { 
  View,
  StyleSheet,
  Modal,
  FlatList,
  Text
} from "react-native";
import {SearchBar} from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default class SearchModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      foods:[],
      search: ""
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
          cholesterol: child.val().cholesterol
        })
      })
      this.setState({foods: li})
      // console.log(li)
    });
  }

  updateSearch = (search) => {
    this.setState({ search });
  };
  handleModalHide = event => {
    event = false
    this.props.setSearchModalState(event)
  }
  render(){
    return(
        <View style={styles.modalView}>
          <View style={styles.topPart}>
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
            <SearchBar
              placeholder="검색할 음식을 입력해주세요"
              onChangeText={this.updateSearch}
              value={this.state.search}
              lightTheme="true"
              round="true"
              platform="ios"
              inputContainerStyle={{height: 20}}
              containerStyle={{height: 50}}
            />
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
                    onPress={
                      () => this.props.navigation.navigate("FoodDetail", {food: item})
                      // console.log(this.state.foods)
                    }
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
                        <MaterialIcons 
                          name="keyboard-arrow-right" 
                          size={18} 
                          color="#737373" 
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.key}
            />
          </View>
        </View>
      // </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#8400ff"
    // animationType
  },
  topPart: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    top: 25,
    flex: 2.1,
  },
  hideBtn: {
    top: 10,
    left: 5
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
    backgroundColor: "#fff",
    top: 10
  },
  foodList: {
    alignItems:"flex-start",
    flexDirection: "row",
    justifyContent:"space-between",
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1.5
  },
  foodInfoPart:{
    justifyContent: "flex-end",
    left: 8
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
    fontSize: 16,
    fontWeight: "500"
  },
  servingSizeFont: {
    color: "#a94dff"
  },
  energy: {

  }
})
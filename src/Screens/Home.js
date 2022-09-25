import React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  RefreshControl
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchModal from '../components/SearchModal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { 
  MaterialCommunityIcons, 
  Entypo, 
  Ionicons 
} from '@expo/vector-icons';
// import * as firebase from '@react-native-firebase/app';

export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.getBreakfast();
    this.getLunch();
    this.getDinner();
    // console.log(this.state.totalBreakfastKcal)
    this.state = {
      refreshing: false,
      totalKcal: 0,
      totalBreakfastKcal: 0,
      totalLaunchKcal: 0,
      totalDinnerKcal: 0,
      breakfast: [],
      lunch: [],
      dinner: []
      // dailyDiet: [
      //   breakfast,
      //   lunch,
      //   dinner
      // ]
    }
  }
  componentDidMount(){
    try{
      let total = [this.state.totalBreakfastKcal, this.state.totalLaunchKcal, this.state.totalDinnerKcal].reduce(
        (acc, cur) => acc + cur
        , 0
      )
      this.setState({totalKcal: total})
    }catch(e){
      console.log(e)
    }
  }
  wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.wait(2000).then(()=>this.setState({refreshing: false}))
  }

  async getBreakfast() {
    try{
      const breakfast = await AsyncStorage.getItem("breakfast")
      const breakfastData = JSON.parse(breakfast)
      // const breakfastDiet = breakfastData
      this.setState({breakfast: breakfastData})
      let totalKcal = breakfastData.reduce(
        (acc, cur) => acc + cur.energy
        , 0
      )
      this.setState({totalBreakfastKcal: totalKcal})
    } catch(e) {
      console.log(e)
    }
  }

  async getLunch() {
    try{
      const lunch = await AsyncStorage.getItem("lunch")
      const lunchData = JSON.parse(lunch)
      this.setState({lunch: lunchData})
      let totalKcal = lunchData.reduce(
        (acc, cur) => acc + cur.energy
        , 0
      )
      this.setState({totalLunchKcal: totalKcal})
    } catch(e) {
      console.log(e)
    }
  }

  async getDinner() {
    try{
      const dinner = await AsyncStorage.getItem("dinner")
      const dinnerData = JSON.parse(dinner)
      this.setState({dinner: dinnerData})
      let totalKcal = dinnerData.reduce(
        (acc, cur) => acc + cur.energy
        , 0
      )
      this.setState({totalDinnerKcal: totalKcal})
    } catch(e) {
      console.log(e)
    }
  }

  getDailyKcal() {
    try{
      let total = [this.state.totalBreakfastKcal, this.state.totalLaunchKcal, this.state.totalDinnerKcal].reduce(
        (acc, cur) => acc + cur
        , 0
      )
      this.setState({totalKcal: total})
    }catch(e){
      console.log(e)
    }
  }

  // totalBreakfastKcal = () => {
  //   const breakfast = this.state.breakfast
  //   let total = breakfast.reduce(
  //     (acc, cur) => acc + cur.energy
  //     , 0
  //   )
  //   this.setState({totalBreakfastKcal: total});
  // }
  updateSearch = (search) => {
    this.setState({ search });
  };


  render(){
    
    return(
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.topPart}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Search")}
            title="Open Search Modal"
          >
            <FontAwesome
              name="search"
              size={26}
              color="#fff"
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {/* <View style={styles.totalKcalPart}>
            <Text>오늘 총 {this.state.totalKcal}kcal 섭취하셨습니다</Text>
          </View> */}
          <View style={styles.dietPart}>
            <View style={styles.dietContainer}>
              <View style={{...styles.mealPart, ...styles.breakfast}}>
                <MaterialCommunityIcons
                  name="weather-sunset" 
                  size={24} 
                  color="#ffcc00"
                  style={{top: 4}}
                />
                <Text style={{...styles.mealFont, ...styles.breakfastFont}}>아침 식사</Text>
                <Text style={styles.kcalFont}>{this.state.totalBreakfastKcal} kcal</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("RegistDiet", 
                  {
                    diet: {
                      name:"아침",
                      value: "breakfast"
                    }
                  })}
                  title="Open Breakfast Regist Modal"
                >
                  <Entypo 
                    name="plus"
                    size={24}
                    color="#8400ff"
                    style={styles.registIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.dietList}>
                <FlatList 
                  data={this.state.breakfast}
                  extraData={this.state.breakfast}
                  windowSize={1}
                  style={{ flex: 1, width: "100%"}}
                  renderItem={({item}) => (
                    <View
                      key={item.key}
                      style={styles.flatList}
                    >
                      <TouchableOpacity
                        onPress={
                          () => this.props.navigation.navigate("DetailWithDel", {
                            food: item,
                            meal: "breakfast"
                          })
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
                              size={22} 
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
            <View style={styles.dietContainer}>
              <View style={{...styles.mealPart, ...styles.lunch}}>
                <Ionicons 
                  name="ios-sunny" 
                  size={26} 
                  color="#ff6600"
                  style={{top: 2}}
                />
                <Text style={{...styles.mealFont, ...styles.lunchFont}}>점심 식사</Text>
                <Text style={styles.kcalFont}>{this.state.totalLunchKcal} kcal</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("RegistDiet", 
                  {
                    diet: {
                      name:"점심",
                      value: "lunch"
                    }
                  })}
                  title="Open Lunch Regist Modal"
                >
                  <Entypo 
                    name="plus"
                    size={26}
                    color="#8400ff"
                    style={styles.registIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.dietList}>
                <FlatList 
                  data={this.state.lunch}
                  extraData={this.state.lunch}
                  windowSize={1}
                  style={{ flex: 1, width: "100%"}}
                  renderItem={({item}) => (
                    <View
                      key={item.key}
                      style={styles.flatList}
                    >
                      <TouchableOpacity
                        onPress={
                          () => this.props.navigation.navigate("DetailWithDel", {
                            food: item,
                            meal: "lunch"
                          })
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
                              size={22} 
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
            <View style={styles.dietContainer}>
              <View style={{...styles.mealPart, ...styles.dinner}}>
                <Ionicons 
                  name="ios-moon" 
                  size={24} 
                  color="#5900b3" 
                />
                <Text style={{...styles.mealFont, ...styles.dinnerFont}}>저녁 식사</Text>
                <Text style={styles.kcalFont}>{this.state.totalDinnerKcal} kcal</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("RegistDiet", 
                  {
                    diet: {
                      name:"저녁",
                      value: "dinner"
                    }
                  })}
                  title="Open Dinner Regist Modal"
                >
                  <Entypo 
                    name="plus"
                    size={26}
                    color="#8400ff"
                    style={styles.registIcon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.dietList}>
                <FlatList 
                  data={this.state.dinner}
                  extraData={this.state.dinner}
                  windowSize={1}
                  style={{ flex: 1, width: "100%"}}
                  renderItem={({item}) => (
                    <View
                      key={item.key}
                      style={styles.flatList}
                    >
                      <TouchableOpacity
                        onPress={
                          () => this.props.navigation.navigate("DetailWithDel", {
                            food: item,
                            meal: "dinner"
                          })
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
                              size={22} 
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  topPart: {
    flex: 0.145,
    backgroundColor: "#8400ff",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  searchIcon:{
    padding: 16
  },
  totalKcalPart: {
    flex: 0.5,
    alignItems: "center",
    
  },
  scrollView:{
    flex: 3,
    marginHorizontal: 8
  },
  dietPart:{
    alignItems:"stretch"
  },
  mealPart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "baseline",
    height: 50,
    backgroundColor: "#fff",
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 2.5,
    borderRightColor: "#e6e6e6",
    borderRightWidth: 2,
    borderRadius: 6,
    paddingBottom: 6,
    marginTop: 20,
  },
  breakfast:{
    // color: 
  },
  lunch: {
    // marginTop: 200
  },
  dinner: {
    // marginTop: 200
  },
  mealFont:{
    fontSize: 20,
    fontWeight: "700",
    // top: 10
  },
  kcalFont: {
    fontSize: 16,
    paddingRight: 130,
    fontWeight: "500"
    // top: 10
  },
  registIcon: {
    top: 10
  },
  dietList: {
    flex: 1,
    backgroundColor: "#fff",
    // alignContent: "center",
    width: "100%"
  },
  searchBarPart: {
    width: "100%",
    marginTop: 30,
    flex: 1
  },
  foodList:{
    flex: 14,
    backgroundColor: "#fff",
    alignContent: "center",
    width: "100%",
    paddingTop: 10
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
    justifyContent: "flex-end",
    padding: 12,
    left: 20
  },
  namePart:{
    paddingBottom: 12
  },
  nameFont:{
    fontSize: 16,
    fontWeight: "600"
  },
  detailPart: {
    flexDirection: "row"
  },
  servingSizeFont: {
    color: "#8400ff",
    paddingRight: 16
    
  },
  iconPart: {
    top: 25,
    right: 4
  }
})
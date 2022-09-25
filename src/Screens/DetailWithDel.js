import React from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit'
import Dialog from "react-native-dialog";

export default class DetailWithDel extends React.PureComponent{
  constructor(props){
    super(props)
    this.state = {
      visible: false
    }
  }
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
    }
    catch(exception) {
      console.log("Done")
    }
  }
  removeDiet = async(meal, food) => {
    try{
      let foodJSON= await AsyncStorage.getItem(meal);
      let foodsArray = JSON.parse(foodJSON);
      alteredFoods = foodsArray.filter(function(e){
        return e.key !== food.key
      })
      AsyncStorage.setItem(meal, JSON.stringify(alteredFoods));
      this.setState({visible: false})
      alert('삭제되었습니다.')
    }
    catch(error){
      console.log(error)
    }
};

  render(){
    const {food} = this.props.route.params;
    const {meal} = this.props.route.params;
    const data = [
      {
        name: "탄수화물",
        amount: Math.round(food.carbohydrate),
        color: "#dab3ff",
        legendFontColor: "#737373",
        legendFontSize: 15
      },
      {
        name: "단백질",
        amount: Math.round(food.protein),
        color: "#c180ff",
        legendFontColor: "#737373",
        legendFontSize: 15
      },
      {
        name: "지방",
        amount: Math.round(food.lipid),
        color: "#9c33ff",
        legendFontColor: "#737373",
        legendFontSize: 15
      },
      {
        name: "당",
        amount: Math.round(food.totalSugers),
        color: "#7700e6",
        legendFontColor: "#737373",
        legendFontSize: 15
      }
    ];
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.5,
      useShadowColorFromDataset: false
    };
    const screenWidth = Dimensions.get("window").width;
    return(
    <View style={styles.container}>
      <View style={styles.topPart}>
        <View style={styles.iconPart}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            title="Dismiss"
          >
            <MaterialIcons 
              name="keyboard-arrow-left" 
              size={34} 
              color="#fff"
              style={styles.backBtn}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textPart}>
          <Text style={styles.nameText}>{food.name}</Text>
        </View>
        <View style={styles.iconPart}></View>
      </View>
      <ScrollView style={styles.detailPart}>
        <View style={styles.chartPart}>
          <PieChart
            data={data}
            width={screenWidth}
            height={200}
            chartConfig={chartConfig}
            accessor={"amount"}
            backgroundColor={"transparent"}
            center={[0, 0]}
            absolute
          />
        </View>
        <View style={styles.titlePart}>
          <Text style={styles.titleText}>영양 정보</Text>
        </View>
        <View style={styles.servingSizePart}>
          <Text style={styles.servingSizeText}>1회 제공량</Text>
          <Text style={styles.servingSizeText}>{food.servingSize} g</Text>
        </View>
        <View style={styles.energyPart}>
          <Text style={styles.energyText}>열량</Text>
          <Text style={styles.energyText}>{food.energy} kcal</Text>
        </View>
        <View style={styles.sugerPart}>
          <View style={styles.carbohydratePart}>
            <Text style={styles.carbohydrateText}>탄수화물</Text>
            <Text style={styles.carbohydrateText}>{food.carbohydrate}g</Text>
          </View>
          <View style={styles.totalSugersPart}>
            <Text style={styles.totalSugersText}>당</Text>
            <Text style={styles.totalSugersText}>{food.totalSugers}g</Text>
          </View>
        </View>
        <View style={styles.proteinPart}>
          <Text style={styles.proteinText}>단백질</Text>
          <Text style={styles.proteinText}>{food.protein}g</Text>
        </View>
        <View style={styles.lipidPart}>
          <Text style={styles.lipidText}>지방</Text>
          <Text style={styles.lipidText}>{food.lipid}g</Text>
        </View>
        <View style={styles.cholesterolPart}>
          <Text style={styles.cholesterolText}>콜레스테롤</Text>
          <Text style={styles.cholesterolText}>{food.cholesterol}mg</Text>
        </View>
        <View style={styles.saltPart}>
          <Text style={styles.saltText}>나트륨</Text>
          <Text style={styles.saltText}>{food.salt}mg</Text>
        </View>
        <View style={styles.delBtnPart}>
          <TouchableOpacity 
            style={styles.delBtn}
            activeOpacity={0.7}
            onPress={() => this.setState({visible: true})}
          >
            <Text style={styles.delete}>삭제</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Dialog.Container visible={this.state.visible}>
        <Dialog.Title>음식 삭제하기</Dialog.Title>
        <Dialog.Description>
          이 음식을 삭제하시겠습니까?
        </Dialog.Description>
        <Dialog.Button label="취소" onPress={() => this.setState({visible: false})} />
        <Dialog.Button label="삭제" onPress={() => this.removeDiet(meal,food)} />
      </Dialog.Container>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff"
  },
  topPart: {
    flex: 0.12,
    backgroundColor: "#8400ff",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  iconPart:{
    flex: 1,
    justifyContent: "flex-start"
  },
  backBtn: {
    left: 5,
    bottom: 5
  },
  textPart:{
    flex: 8,
    flexDirection: "row",
    justifyContent: "center"
  },
  nameText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
    bottom: 12,
  },
  detailPart: {
    flex: 8,
    marginHorizontal: 20,
    marginTop: 5
  },
  titlePart: {
    flex: 2,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: 4
  },
  titleText: {
    fontSize: 30,
    fontWeight: "800",
    
  },
  servingSizePart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomColor: "#737373",
    borderBottomWidth: 2
  },
  servingSizeText: {
    fontSize: 20,
    fontWeight: "700"
  },
  energyPart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomColor: "#8c8c8c",
    borderBottomWidth: 1
  },
  energyText: {
    fontSize: 18,
    fontWeight: "600"
  },
  sugerPart: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomColor: "#8c8c8c",
    borderBottomWidth: 1
  },
  carbohydratePart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12
  },
  carbohydrateText: {
    fontSize: 18,
    fontWeight: "600"
  },
  totalSugersPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4
  },
  totalSugersText: {
    fontSize: 16
  },
  proteinPart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomColor: "#8c8c8c",
    borderBottomWidth: 1
  },
  proteinText: {
    fontSize: 18,
    fontWeight: "600"
  },
  lipidPart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomColor: "#8c8c8c",
    borderBottomWidth: 1
  },
  lipidText: {
    fontSize: 18,
    fontWeight: "600"
  },
  cholesterolPart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomColor: "#8c8c8c",
    borderBottomWidth: 1
  },
  cholesterolText: {
    fontSize: 16
  },
  saltPart: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 4,
    borderBottomColor: "#8c8c8c",
    borderBottomWidth: 4
  },
  saltText: {
    fontSize: 16
  },
  delBtnPart:{
    flex: 1,
    paddingTop: 22,
    alignItems: "center"
  },
  delBtn: {
    justifyContent: "center",
    width: 260,
    height: 40,
    backgroundColor: "#ff1a1a",
    borderRadius: 26
  },
  delete: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800"
  }
})
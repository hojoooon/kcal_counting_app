import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import RegistDietScreen from "../Screens/RegistDiet";
import Home from "../Screens/Home";

const RegistStack = createStackNavigator();

function RegistDietStackScreen() {
  return(
    <RegistStack.Navigator>
        <RegistStack.Screen name="RegistDiet" component={RegistDietScreen} />
    </RegistStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen(){
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="RegistDiet" component={RegistDietStackScreen} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

export default class BottomTab extends React.Component{
  render(){
    return (
      <View>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Home" component={HomeTabs} />
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}


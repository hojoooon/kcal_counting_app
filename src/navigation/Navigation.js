import * as React from 'react';
import {  NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import SearchModal from '../components/SearchModal';
import FoodDetail from '../Screens/FoodDetail';
import BarcodeScan from '../Screens/BarcodeScan';
import WeeklyData from '../Screens/WeeklyData';
import RegistDiet from '../Screens/RegistDiet';
import Profile from '../Screens/Profile';
import DetailWithDel from '../Screens/DetailWithDel';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={Home}  
        options={{headerShown: false}}
        initialParams={{breakfast: []}}
        
      />
    </HomeStack.Navigator>
  )
}

const RootStack = createStackNavigator();

function RootStackScreen ({navigation, route}) {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  }else {
    navigation.setOptions({tabBarVisible: true})
  }
  return(
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={HomeStackScreen}
        options={{headerShown: false}}
        initialParams={{dailyDiet: []}}
      />
      <RootStack.Screen 
        name="Search" 
        component={SearchModal} 
        options={{headerShown: false}}
      />
      <RootStack.Screen 
        name="FoodDetail" 
        component={FoodDetail}
        options={{headerShown: false}}
      />
      <RootStack.Screen 
        name="RegistDiet" 
        component={RegistDiet} 
        options={{headerShown: false}}
      />
      <RootStack.Screen 
        name="DetailWithDel" 
        component={DetailWithDel} 
        options={{headerShown: false}}
      />
      <RootStack.Screen 
        name="Barcode" 
        component={BarcodeScan} 
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  )
}

const WeeklyStack = createStackNavigator();

function WeeklyStackScreen() {
  return(
    <WeeklyStack.Navigator>
      <WeeklyStack.Screen name="Weekly" component={WeeklyData} />
    </WeeklyStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return(
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Nav() {
  return(
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'food-fork-drink';
            } else if (route.name === 'Weekly') {
              iconName = 'calendar-blank';
            } else if (route.name === "Profile") {
              iconName = 'account';
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={28} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#a94dff',
          inactiveTintColor: '#cccccc',
          showLabel: false
        }}
        initialRouteName="Home"
      >
        <Tab.Screen name="Weekly" component={WeeklyStackScreen} />
        <Tab.Screen name="Home" component={RootStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
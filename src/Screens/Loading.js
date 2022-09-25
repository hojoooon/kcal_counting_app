import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Loading() {
  return( 
    <View style={styles.container}>
      <View style={styles.iconPart}>
        <MaterialCommunityIcons
          size={140}
          color={"#fff"}
          name={"food-fork-drink"}
        />
      </View>
      <View style={styles.textPart}>
        <Text style={styles.text}>Kcal Counter App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#8400ff"
  },
  iconPart: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  textPart: {
    flex:1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100
  },
  text: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "600"
  }
});
import React, { useState } from "react";
import { Platform, StatusBar, Text, StyleSheet, View } from "react-native";
import { Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import QuizzQuestion from "./screens/QuizzQuestion";
import { AsyncStorage } from "react-native";
import { displayData, saveScore } from "./utils/utils";

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: "none"
  };

  componentWillMount() {
    saveScore(0);
  }

  debug() {
    /*
  saveScore(2019);
  (async () => {
    console.log(await displayData())
  })()
  */
    alert("Previously debug..");
  }

  process() {
    console.log("entered quizz");
    this.props.navigation.navigate("QuizzQ", {
      questionNum: 0
    });
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ height: 50, fontSize: 20, marginBottom: 30 }}>
          Welcome to Purity Quizz
        </Text>
        <Button
          style={{ height: 150, marginBottom: 30 }}
          title="Start"
          onPress={() => this.process()}
        />
        <Button
          style={{ height: 150 }}
          title="Debug tools  "
          onPress={() => this.debug()}
        >
          {" "}
        </Button>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    QuizzQ: QuizzQuestion
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

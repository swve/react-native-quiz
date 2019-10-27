import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { View, Text, StyleSheet, Button} from 'react-native';
import { getQuestionData , updateScore } from '../utils/utils'
import { displayData, saveScore } from '../utils/utils'
import { AsyncStorage } from 'react-native';

//const userScore = SyncStorage.get('userScore'); 

class QuizzQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum:this.props.navigation.state.params.questionNum,
      info:"Question"
    };
  }
  

  loadData(){
    this.setState({ info: getQuestionData(this.state.questionNum) })
  }

  ///
  
  
  componentDidMount() {
    this.loadData();
  }

  nextQuestion(){
    console.log('switching to : ')
    this.props.navigation.navigate({ key: Math.random () * 10000 , routeName: 'QuizzQuestion', params: {
      questionNum: this.state.questionNum+1,
    } })
  }
  
  getScore(){
    alert((async () => {
      await displayData()
    })())
  }

  addScore(answer){
    if(answer===this.state.info.correct){
      // saving score
      let score = (async () => { console.log(await displayData()) })() ; 
      finalScore = score + this.state.info.points ; 
      console.log(finalScore)
      //saveScore(finalScore);
      (async () => { console.log(await displayData()) })()
    }
    else{
      // saving score
      let score = (async () => { console.log(await displayData()) })() ; 
      finalScore = score - this.state.info.points ; 
      saveScore(finalScore);
      (async () => { console.log(await displayData()) })()
    }
    
  }

  render() {
    return (
      <View>
        <Text style={styles.h1}> {this.state.info.text} </Text>
        <Button onPress={() => this.addScore(true) } title="Yes"></Button>
        <Button onPress={() => this.addScore(false) } title="No"></Button>
        <Button onPress={() => this.nextQuestion() } title="Next"></Button>
        <Button onPress={() => this.getScore() } title="Score "></Button>
      </View>
    );
  }


}

const styles = StyleSheet.create({
    h1: {
      paddingTop: 100,
      textAlign:"center"
      
    },
    
  });

  const RootStack = createStackNavigator(
    {
    QuizzQuestion: QuizzQuestion,
    },
    {
    headerMode:'none'
    }
  );
  
  export default createAppContainer(RootStack);
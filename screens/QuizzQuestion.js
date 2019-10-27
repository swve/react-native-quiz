import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { View, Text, StyleSheet, Button} from 'react-native';
import { getQuestionData , updateScore } from '../utils/utils'
import { displayData, saveScore } from '../utils/utils'
import { AsyncStorage } from 'react-native';
import Results from '../screens/Results';
import { zoomIn } from 'react-navigation-transitions';

//const userScore = SyncStorage.get('userScore'); 

class QuizzQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum:this.props.navigation.state.params.questionNum,
      info:"Question",
      score:0,
    };
  }
  
  // Questions load 

  loadData(){
    this.setState({ info: getQuestionData(this.state.questionNum) })
  }

  componentDidMount() {
    this.loadData();
    displayData()
    .then((data) => {
      this.setState({
        score:data,
      })  
    });
  }

  nextQuestion(){
    console.log('switching to : ' + this.state.questionNum)
    if (this.state.questionNum==5) {
      this.props.navigation.navigate({ key: Math.random () * 10000 , routeName: 'Results' })
    } else {
      this.props.navigation.navigate({ key: Math.random () * 10000 , routeName: 'QuizzQuestion', params: {
        questionNum: this.state.questionNum+1,
      } })
    }
  }
  
  // Score gestion
  getScore(){
    (async () => {
      alert(await displayData())
    })()
  }

  addScore(answer){
    if(answer===this.state.info.correct){
      // saving score
      let finalScore = this.state.score + this.state.info.points ; 
      console.log( "score " + finalScore )
      saveScore(finalScore);
      this.nextQuestion();
    }
    else{
      // saving score
      let finalScore = this.state.score - this.state.info.points ; 
      console.log( "score " + finalScore )
      saveScore(finalScore);
      this.nextQuestion();
    }
    
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.h1}> {this.state.info.text} </Text>
        <Button onPress={() => this.addScore(true) } title="Yes"></Button>
        <Button onPress={() => this.addScore(false) } title="No"></Button>
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
    Results:Results
    },
    {
    headerMode:'none',
    transitionConfig: () => zoomIn(1100), 
    },
    
  );
  
  export default createAppContainer(RootStack);
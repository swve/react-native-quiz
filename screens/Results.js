import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { displayData, saveScore } from '../utils/utils'

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
        score:0
    };
  }

  componentDidMount() {
    displayData()
    .then((data) => {
      this.setState({
        score:data,
      })  
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <Text> Your purity is : {this.state.score}</Text>
      </View>
    );
  }
}

import * as data from "../assets/questions/questions.json";
import { AsyncStorage } from 'react-native';

export function getQuestionData(n){
    //return 'test'
   return data.questions[n];
    //console.log(data.questions[n]);
}


export function saveScore(scoreInt) {
    let user = {
        name : 'user',
        score:scoreInt,
    }
    AsyncStorage.setItem('user',JSON.stringify(user));
}


    displayData = async () => {
        try{
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user)
            return parsed.score;
        }
        catch(error){
            alert(error);
        }
    }
    module.exports.displayData = displayData;
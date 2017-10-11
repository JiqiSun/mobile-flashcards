import React, {Component} from 'react'
import { View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native'
import * as api from '../utils/api'
import { clearLocalNotification,setLocalNotification} from "../utils/helpers";

export default class Quiz extends Component {

    state = {
        data:{title:'',
              questions:[
                  {question:'',
                   answer: ''
                  }
              ]
             },
        index: 1,
        correct:0,
    }

    componentDidMount(){
        const title = this.props.navigation.state.params.title
        api.getDeck(title).then((data) => {
            this.setState({data:JSON.parse(data)})
        })
    }

    handlePress = (value) =>{
        if(this.state.index === this.props.navigation.state.params.cards){
            if (value==='correct'){
                this.props.navigation.navigate(
                    'DisplayScore',
                    {
                        title:this.props.navigation.state.params.title,
                        correct:this.state.correct+1,
                        cards:this.props.navigation.state.params.cards
                    })
            }else {
                this.props.navigation.navigate(
                    'DisplayScore',
                    {
                        title:this.props.navigation.state.params.title,
                        correct:this.state.correct,
                        cards:this.props.navigation.state.params.cards,
                    })
            }

        } else if (value==='correct'){
            this.setState({correct:this.state.correct+1})
            this.setState({index:this.state.index+1})
        } else {
            this.setState({index:this.state.index+1})
        }

    }

    showAnswer = () =>{
        const {data,index} = this.state
        this.props.navigation.navigate(
            'Answer',
            {
                answer:data['questions'][index-1]['answer']
            })
    }

    render() {
        const {data,index} = this.state
        return (
            <View style={styles.container}>
                < Text style={[styles.counter,{alignSelf:'flex-start'}]}>
                    {index} / {this.props.navigation.state.params.cards}
                </Text>
                <Text style={styles.title}>
                    {data['questions'][index-1]['question']}
                </Text>
                <TouchableOpacity onPress={this.showAnswer}>
                    <Text style={styles.btn}>Show Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handlePress('correct')}>
                    <Text style={styles.box}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handlePress('incorrect')}>
                    <Text style={styles.box}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    counter:{
        margin: 10,
        padding:10,
    },
    title: {
        width:Dimensions.get('window').width,
        margin: 10,
        padding:10,
        textAlign:'center',
        fontSize:45,
    },

    box: {
        width:250,
        margin: 10,
        padding:10,
        textAlign:'center',
        borderColor:'#d6d7da',
        borderWidth:2,
    },

    btn: {
        width:250,
        margin: 10,
        padding:10,
        textAlign:'center',
    }
});
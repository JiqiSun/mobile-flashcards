import React, {Component} from 'react'
import { NavigationActions } from 'react-navigation'
import { View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import * as api from '../utils/api'

export default class Question extends Component {

    state = {
        question:'Input your question',
        answer:'Input your answer',
    }

    addQuestion = (input) => {
        this.setState({question:input})
    }

    addAnswer = (input) => {
        this.setState({answer:input})
    }

    handlePress = () => {
        const title = this.props.navigation.state.params.title
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
        api.addCardToDeck(title,card)
        if ( this.props.navigation.state.params.updateData){
            this.props.navigation.state.params.updateData()
        }
        this.props.navigation.state.params.updateCards(title)
        this.goBack()

    }

    goBack = () =>{
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const {question, answer} = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.box}
                    value = {question}
                    onChangeText = {this.addQuestion}
                />
                <TextInput
                    style={styles.box}
                    value = {answer}
                    onChangeText = {this.addAnswer}
                />
                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={styles.btn}>Create New Card</Text>
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
        justifyContent: 'center'
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
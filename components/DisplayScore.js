import React, {Component} from 'react'
import { View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native'

export default class Question extends Component {
    backToDeck = () =>{
        this.props.navigation.navigate(
            'IndividualDeck',
            {
                title:this.props.navigation.state.params.title,
                cards:this.props.navigation.state.params.cards,
            })
    }

    restartQuiz = () =>{
        this.props.navigation.navigate(
            'Quiz',
            {
                title:this.props.navigation.state.params.title,
                cards:this.props.navigation.state.params.cards,
            })

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Your score
                </Text>
                <Text>
                    {this.props.navigation.state.params.correct} correct
                </Text>
                <TouchableOpacity onPress={this.backToDeck}>
                    <Text style={styles.box}>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.restartQuiz}>
                    <Text style={styles.box}>Restart Quiz</Text>
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
import React, {Component} from 'react'
import Quiz from './Quiz'
import Question from './Question'
import {View,
        Text,
        TouchableOpacity,
        StyleSheet,
        Dimensions,
        Animated
} from 'react-native'
import * as api from '../utils/api'
import { clearLocalNotification,setLocalNotification} from "../utils/helpers"
import { NavigationActions } from 'react-navigation'

class HeaderBackHome extends React.Component {

    reset = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'}),
            ]
        })

        return this.props.navigation.dispatch(resetAction)
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={this.reset}>
                    <Text>Back to home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default class IndividualDeck extends Component {

    state = {
        title: this.props.navigation.state.params.title,
        cards: this.props.navigation.state.params.cards,
        opacity: new Animated.Value(0),

    }

    componentDidMount() {
        const {opacity} = this.state
        Animated.timing(opacity,{toValue:1, duration:1000})
            .start()
    }

    addCard = () => {
        this.props.navigation.navigate(
            'Question',
            {
                title: this.props.navigation.state.params.title,
                updateData: this.props.navigation.state.params.updateData,
                updateCards: this.updateCards
            })
    }

    updateCards = (title) =>{
        api.getDeck(title).then((data)=>{
            const cards = JSON.parse(data)['questions'].length
            this.setState({cards:cards+1})
        })
    }

    startQuiz = () => {
        if(this.props.navigation.state.params.cards!==0 || this.state.cards!==0){
            this.props.navigation.navigate(
                'Quiz',
                {
                    title: this.state.title,
                    cards: this.state.cards
                })
        }
        clearLocalNotification().then(setLocalNotification)
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.title,
        headerLeft: <HeaderBackHome navigation={navigation} />,
    })

    render() {
        const {title, cards, opacity} = this.state
        return (
            <Animated.View style={[styles.container,{opacity}]}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text>
                    {cards} cards
                </Text>
                <TouchableOpacity onPress={this.addCard}>
                    <Text style={styles.box}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.startQuiz}>
                    <Text style={styles.box}>Start Quiz</Text>
                </TouchableOpacity>
            </Animated.View>
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
});
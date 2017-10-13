import React from 'react'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import IndividualDeck from './components/IndividualDeck'
import Question from './components/question'
import Quiz from './components/quiz'
import DisplayScore from './components/displayScore'
import Answer from './components/answer'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { setLocalNotification } from './utils/helpers'
import { NavigationActions } from 'react-navigation'

class HeaderBackArrow extends React.Component {

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
                <TouchableOpacity>
                    <Text>Back to home</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


// const Tabs = TabNavigator({
//     Decks: {
//         screen: DeckList
//     },
// });

const MainNavigator = StackNavigator({
    Home: {
      screen: DeckList,
    },
    NewDeck: {
        screen: NewDeck
    },
    IndividualDeck: {
        screen: IndividualDeck,
    },
    Question: {
        screen: Question,
    },
    Quiz: {
        screen: Quiz,
    },
    DisplayScore: {
        screen: DisplayScore,
    },
    Answer: {
        screen: Answer,
    }
})

export default class App extends React.Component {

    componentDidMount () {
        setLocalNotification()
    }

    render() {
        return (
            <MainNavigator />
        );
    }
}


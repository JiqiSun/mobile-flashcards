import React from 'react'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import IndividualDeck from './components/IndividualDeck'
import Question from './components/Question'
import Quiz from './components/Quiz'
import DisplayScore from './components/DisplayScore'
import Answer from './components/Answer'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { setLocalNotification } from './utils/helpers'

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


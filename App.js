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


const Tabs = TabNavigator({
    Decks: {
        screen: DeckList
    },
    NewDeck: {
        screen: NewDeck
    },
});

const MainNavigator = StackNavigator({
    Home: {
      screen: Tabs,
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


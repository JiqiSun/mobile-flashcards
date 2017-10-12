import { AsyncStorage } from 'react-native'

export const getDecks = () => {
    return AsyncStorage.getAllKeys()
}

export const getDeck = (id) => {
    return AsyncStorage.getItem(id)
}

export const saveDeckTitle = (title) => {
    return AsyncStorage.setItem(title,JSON.stringify({
        title:title,
        questions:[]
    }))
}

export const addCardToDeck = (title, card) => {
    AsyncStorage.getItem(title).then((data)=>{
        let deck = JSON.parse(data)
        deck['questions'].push(card)
        AsyncStorage.setItem(title,JSON.stringify(deck))
    })



}

export const clearAll = () => {
    return AsyncStorage.clear()
}




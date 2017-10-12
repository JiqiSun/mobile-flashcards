import React, {Component} from 'react'
import IndividualDeck from './IndividualDeck'

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native'
import * as api from '../utils/api'


export default class NewDeck extends Component {
    state = {
        input: '',
        cards:[]
    }

    handleTextChange = (input) => {
        this.setState({input})
    }

    handlePress = () => {
        api.saveDeckTitle(this.state.input)
        api.getDeck(this.state.input).then((data)=>{
            this.setState({cards:data})
        })
        this.props.navigation.state.params.updateData()
        this.props.navigation.navigate(
            'IndividualDeck',
            { title: this.state.input,
              cards: this.state.cards.length,
              updateData: this.props.navigation.state.params.updateData,
            })
    }

    render() {
        const { input } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    What is the title of your new deck?
                </Text>
                <TextInput
                    style={styles.box}
                    placeholder = {'Deck Title'}
                    value = {input}
                    onChangeText = {this.handleTextChange}
                />
                <TouchableOpacity onPress={this.handlePress}>
                    <Text>Create New Deck</Text>
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
        justifyContent: 'space-around',
    },
    title: {
        width:Dimensions.get('window').width,
        margin: 10,
        padding:10,
        textAlign:'center',
        fontSize:20,
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
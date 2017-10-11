import React, {Component} from 'react'
import { View, Text, FlatList, TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import * as api from '../utils/api'
import IndividualDeck from './IndividualDeck'

class Lists extends Component {

    handlePress = () => {
        this.props.navigation.navigate(
            'IndividualDeck',
            { title: this.props.title,
              cards: this.props.questions.length,
              updateData: this.props.updateData
            })
    }

    render(){
        return (
            <View style={styles.box}>
                <TouchableOpacity onPress={this.handlePress}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.handlePress}>
                    <Text>{this.props.questions.length} cards</Text>
                </TouchableOpacity>
            </View>
        )

    }

}

export default class DeckList extends Component {
    state = {
        data:[],
    }

    getAllDecks =() => {
        let allDecks = []
        api.getDecks().then((keys) => {
            for(let key of keys){
                if (key!=='MobileFlashCards:notifications'){
                    api.getDeck(key).then((data)=>{
                        allDecks.push(JSON.parse(data))
                        if (allDecks.length === keys.length-1){
                            this.setState({data:allDecks})
                        }
                    })
                }
            }
        })
    }

    componentDidMount(){
        this.getAllDecks()
    }

    updateData = () => {
       this.getAllDecks()
    }


    renderItem = ({ item }) => {
        return <Lists {...item}
                      navigation={this.props.navigation}
                      updateData={this.updateData}
        />
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data = {this.state.data}
                    keyExtractor = { (item) => item.title}
                    renderItem = {this.renderItem}
                />
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
    box: {
        margin: 10,
        padding: 10,
        alignItems: 'center',
        borderBottomColor:'#d6d7da',
        borderBottomWidth:2,
        width:Dimensions.get('window').width,
    },
    title: {
        fontSize: 25,
    }

});
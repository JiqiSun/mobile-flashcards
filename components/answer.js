import React, {Component} from 'react'
import { View, Text, StyleSheet,Dimensions} from 'react-native'


export default class Question extends Component {


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.navigation.state.params.answer}</Text>
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
    text: {
        width:Dimensions.get('window').width,
        margin: 10,
        padding:10,
        textAlign:'center',
        fontSize:25,
    },


});
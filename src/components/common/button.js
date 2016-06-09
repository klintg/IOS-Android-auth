import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

class Button extends Component{
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'gray'}
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text} </Text>
      </TouchableHighlight>
    )
  }
}

  const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      borderColor: '#529ecc',
      marginTop: 10,
      backgroundColor:'#529ecc'
    },
    buttonText: {
      flex:1,
      alignSelf: 'center',
      fontSize: 16,
      color: '#FFF'
    }
  })


export default Button

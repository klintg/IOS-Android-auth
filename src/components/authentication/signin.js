import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import Button from '../common/button'
import Header from '../common/header'

import Firebase from 'firebase'


let app = new Firebase("klintauth.firebaseIO.com")

class Signin extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      loaded: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="Sign In" loaded={this.state.loaded}/>
        <View style={styles.body}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
              style={styles.input}
              value={this.state.username}
              onChangeText={(text) => this.setState({username: text})}/>

          <Text style={styles.label}>Password:</Text>
          <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}/>

          <Button text={'Sign In'} onPress={() => this.onPress()}/>
          <Button text={'Create an account'} onPress={ () => this.onSignupPress()}/>
        </View>
      </View>
    )
  }
  onSignupPress() {
    //navigate over to signup
    //console.log(this.props.name)
    //console.log(this.props.routes)
    this.props.navigator.push({name: 'signup'})

  }
  onPress() {
    //this.setState({password: ''})
    /*
    Parse.User.logIn(this.state.username, this.state.password, {
      success: (user) => {console.log(user)},
      error: (data, error) => { this.setState({ errorMessage: error.message})}

    })
    */

    this.setState({
      loaded: false
    })

    app.authWithPassword({
      "email": this.state.username,
      "password": this.state.password
    }, (error, user_data) => {

      this.setState({
        loaded: true
      })

      if(error) {
        alert('Login Failed. Please try again')
        console.log("This is  the error:",error)
      } else {
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));

        this.props.navigator.immediatelyResetRouteStack([{name: 'account'}])

        //console.log(user_data)
      }
    })


  }
}

const styles = StyleSheet.create({
  container: {
    flex:6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex:2,
    alignItems: 'center'
  },
  input: {
    padding:4,
    height: 35,
    borderColor: 'blue',
    borderRadius: 5,
    borderWidth: 1,
    margin:5,
    width: 200,
    alignSelf:'center'
  },
  label: {
    fontSize: 13
  }
})
export default Signin

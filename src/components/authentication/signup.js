import React, { Component } from 'react';
import {
  TextInput,
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from '../common/button'
import Header from "../common/header"

import Firebase from 'firebase'
let app = new Firebase("klintauth.firebaseIO.com")

class Signup extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
      loaded: true
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header text="Signup" loaded={this.state.loaded}/>
        <View style={styles.body}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}
                style={styles.input}
                placeholder="email"
             />

            <Text style={styles.label}>Password:</Text>
            <TextInput
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                style={styles.input}
                placeholder="password"
            />

            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
                secureTextEntry={true}
                value={this.state.passwordConfirmation}
                onChangeText={(text) => this.setState({passwordConfirmation: text})}
                style={styles.input}
                placeholder="confirm"
            />

            <Text style={styles.label}>{this.state.errorMessage}</Text>
            <Button text={'SignUp'} onPress={() => this.onSignupPress()} />
            <Button text={'I have an account...'} onPress={() => this.onSigninPress()} />
        </View>
      </View>
    )
  }
  onSignupPress() {
    if (this.state.password !== this.state.passwordConfirmation) {

      return this.setState({errorMessage: "Your passwords do not match"})
    }

    this.setState({
      loaded:false
    })

    app.createUser({
      "email": this.state.username,
      "password": this.state.password
    }, (error, userData) => {
      if (error) {
        switch(error.code) {

          case "EMAIL_TAKEN":
            alert("Email Is Already In Use")
          break;

          case "INVALID_EMAIL":
            alert("The Email Is Not a Valid Email")
          break;

          default:
            alert('Error creating user:')
        }
      }else {
        alert('Your Account Was Created!, You can now login into your new account', userData.uid)
        //AsyncStorage.setItem('user_data', JSON.stringify(userData));
        this.props.navigator.push({name: 'signin'})
      }

      this.setState({
        username: '',
        password: '',
        loaded: true
      })
    })

  }
  onSigninPress() {
    this.props.navigator.push({name: 'signin'})
  }
}

const styles = StyleSheet.create({
  container: {
    flex:6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  body: {
    flex:2,
    alignItems: 'center'
  },
  label: {
    fontSize: 13,
    color:"#000099"
  },
  input: {
    padding:4,
    height: 40,
    borderColor: '#4da6ff',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  }
});

export default Signup

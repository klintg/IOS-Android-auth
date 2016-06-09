//once the user signs in successfully
import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';

import Button from '../common/button'
import Firebase from 'firebase'

let app = new Firebase("klintauth.firebaseIO.com")

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json)
      console.log("this is the passed user_data", user_data)
      this.setState({
        user: user_data,
        loaded: true
      })
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.container}>
        {this.state.user &&
          <View>
            <View style={styles.emailContainer}>
              <Text style={styles.emailText}>Welcome {this.state.user.password.email}</Text>
            </View>


            <Button text={'logout'} onPress={() => this.logout()} />
          </View>
        }
        </View>
      </View>
    )
  }

  logout() {
    AsyncStorage.removeItem("user_data").then(() => {
      app.unauth()
      this.props.navigator.push ({
        name:'signin'
      })
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  emailContainer:{
    padding: 20
  },
  emailText: {
    fontSize:18
  },
  image: {
    width: 100,
    height: 100
  }
})

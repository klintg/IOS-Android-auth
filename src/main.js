import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet
} from 'react-native';


import Signin from './components/authentication/signin'
import Signup from './components/authentication/signup'
import Account from './components/authentication/account'

/* var ROUTES = {
  signin: Signin,
  signup: Signup
};
*/

class Main extends Component{
  componentWillMount() {

  }

  renderScene(route, navigator) {
    //var Component = ROUTES[route.name]
    //console.log(route.name)
    //return (<Component route={route} navigator={navigator} name="gitahi"/>)
    if(route.name == 'signin') {
      return <Signin navigator={navigator} {...route.passProps}/>
    }
    if(route.name == 'signup') {
      return <Signup navigator={navigator} {...route.passProps}/>
    }
    if(route.name == 'account') {
      return <Account navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signup'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    )
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1
  }
})
export default Main

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter
} from 'react-native';




import AudioFloatingWidget from 'react-native-audio-floating-widget';


createBubble = () => {
    AudioFloatingWidget.show();
    /*AudioFloatingWidget.addListener('onPlayPauseClicked',
             (params) => {
                    alert(params.isPlaying)
             })
    */

}


export default class ScreenOne extends Component{

  static navigationOptions = {
    title: "Welcome"
  }
 
  constructor(props) {
    super(props);
    this.state = {initialScreen: true, productsListScreen:false, textLocation: 10 };

    
  }

  openProductsList (){
      this.setState({ initialScreen: !this.state.initialScreen });
      this.setState({ productsListScreen: !this.state.productsListScreen });
      this.setState({ textLocation: this.state.textLocation+5 });
  };

  componentWillMount() {
       // this package has eventListeners that you can manage via DeviceEventEmitter;  
       
       //alert("TEST1")
       
       const { navigate } = this.props.navigation

       DeviceEventEmitter.addListener(
           'onPlayPauseClicked',
           (params) => {
                  //alert(params.isPlaying);
                  navigate("ScreenTwo", {screen: "Screen Two"})
                  this.openProductsList();
                  //alert(this.state.initialScreen);
           }
       );
       
       //please view available methods in docs
  }




  render() {

    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button
          onPress = {createBubble}
          title="Test 35 Butibot oluştur"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Text style = {{marginTop:this.state.textLocation}}> SCREEN ONE</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

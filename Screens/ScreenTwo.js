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



//componentWillMount();
//alert("TEST2");

//alert(AudioFloatingWidget.isShown().toString());
/*
AudioFloatingWidget.DeviceEventManagerModule.DeviceEventEmitter.addListener(
         'onPlayPauseClicked',
         (params) => {
                alert(params.isPlaying)
         }
     );
*/

export default class ScreenTwo extends Component {
 
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
       DeviceEventEmitter.addListener(
           'onPlayPauseClicked',
           (params) => {
                  //alert(params.isPlaying);
                  this.openProductsList();
                  //alert(this.state.initialScreen);
           }
       );
       
       //please view available methods in docs
  }




  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress = {createBubble}
          title="Test4 Butibot oluştur"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        //list goes here



        <Text style = {{marginTop:this.state.textLocation}}> SCREEN TWO </Text>
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

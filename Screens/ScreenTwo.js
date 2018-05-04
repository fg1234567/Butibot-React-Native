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
  FlatList,
  Button,
  DeviceEventEmitter,

} from 'react-native';

import SearchBar from 'react-native-searchbar';

import { List, ListItem } from "react-native-elements";

  const list_of_products = [
    {
      name: 'Yuzuk',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Yuzuk_1'
    },
    {
      name: 'Kolye',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Kolye_1'
    }
  ]

export default class ScreenTwo extends Component {
 
  constructor(props) {
    super(props);
    this.state = {initialScreen: true, productsListScreen:false, textLocation: 10, list: list_of_products };

    
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

  _handleResults = (results) => {
    alert(results);
    alert(results[0]);
    //alert(results.name);
    //alert(results.name[0]);
    this.setState({ list: results });
    alert(this.state.list);
    alert(this.state.list[0]);
    alert(this.state.list.name);

  }




  render() {
    return (
            


      <View>
          <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={list_of_products}
          handleResults={this._handleResults}
          showOnLoad
          />
        <List containerStyle={{marginTop: 80}}>
          {
            list_of_products.map((l, i) => (
              <ListItem 
                onPress ={()=>{alert('Stock updated!')}}
                key={i}
                avatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
        </List>
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

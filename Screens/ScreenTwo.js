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
  ScrollView,
  Alert

} from 'react-native';

import SearchBar from 'react-native-searchbar';

import { List, ListItem } from "react-native-elements";

import * as firebase from 'firebase';

  const list_of_products = [
    {
      name: 'Yeni 3Ct Mega Kraltacı Beştaş',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      stock: 5
    },
    {
      name: 'Elmas Montür Divanhane Model Yüzük',
      avatar_url: 'https://st2.myideasoft.com/idea/bm/73/myassets/products/281/divane-yuzuk-129tl_min.jpg?revision=1477550323',
      stock: 5
    },
    {
      name: 'Mini A Model Beştaş Yüzük',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      stock: 5
    },
    {
      name: 'A Model Beştaş Yüzük',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      stock: 5
    },
    {
      name: 'Oval Safir İtalyan Kilit Küpe',
      avatar_url: 'https://st2.myideasoft.com/idea/bm/73/myassets/products/106/img-1677_min.jpg?revision=1524684573',
      stock: 5
    },
    {
      name: 'Tasarım Tamtur Küpe',
      avatar_url: 'https://st1.myideasoft.com/idea/bm/73/myassets/products/312/88309-copy_min.jpg?revision=1525513906',
      stock: 5
    },
    {
      name: 'Swarovski Elmas Montür Sıvama V Model Tektaş Küpe',
      avatar_url: 'https://st3.myideasoft.com/idea/bm/73/myassets/products/777/takc-31844-swa_min.jpg?revision=1480352178',
      stock: 5
    }
  ]


export default class ScreenTwo extends Component {
 
  constructor(props) {
    super(props);
    this.state = {initialScreen: true, productsListScreen:false, textLocation: 10, results: list_of_products };
    this._handleResults = this._handleResults.bind(this);

    this.config = {
    apiKey: "AIzaSyBBV0yx8wqj0f-vWzrrfutjNC_n_lm22oM",
    authDomain: "butibot-383bf.firebaseapp.com",
    databaseURL: "https://butibot-383bf.firebaseio.com",
    projectId: "butibot-383bf",
    storageBucket: "",
    messagingSenderId: "772911870238"
    };
    
    this.firebaseApp = firebase.initializeApp(this.config);

    this.myFirebaseRef = this.firebaseApp.database().ref();

    this.myFirebaseRef.on('value' ,  (snapshot) => {
      
      let resultsLength = Object.keys(snapshot.val()).length; // this is the number of list items retrieved from database 

      //alert(resultsLength);

      //alert(snapshot.val());
      this.setState({results: snapshot.val()});



    });

    
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
    

    let resultsLength = Object.keys(results).length; // this is the number of list items found via "item search" 

    //alert(resultsLength);


    this.setState({ results });

  }

  stockInc = (name,stock,i) => {

    let newStock = ++stock;
    let orderID = i+1;

    alert(orderID + ' numaralı ürünün miktarı ' + newStock + ' olarak değiştirildi!');
    
    let tempArray = JSON.parse(JSON.stringify(this.state)).results;

    tempArray[i].stock = newStock;

    this.setState({
      results: tempArray,
    });

    this.myFirebaseRef.set(tempArray);

  }

  stockDec = (name,stock,i) => {

    let newStock = --stock;
    let orderID = i+1;
    alert(orderID + ' numaralı ürünün miktarı ' + newStock + ' olarak değiştirildi!');
    
    let tempArray = JSON.parse(JSON.stringify(this.state)).results;

    tempArray[i].stock = newStock;

    this.setState({
      results: tempArray,
    });

    this.myFirebaseRef.set(tempArray);

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

        <ScrollView>


            <List containerStyle={{marginTop: 80}}>
              {
                this.state.results.map((l, i) => (
                  <ListItem 
                    onPress ={()=>{Alert.alert('Stok Güncellemesi', 'İşlemi seçiniz', [
                        {text: 'Stok artır', onPress: () => {this.stockInc(l.name,l.stock,i)}},
                        {text: 'Stok azalt', onPress: () => {this.stockDec(l.name,l.stock,i)}},
                        {text: 'İptal et', onPress: () => console.log('OK Pressed'), style: 'cancel'},
                         ],
                        { cancelable: false }
                      )}}
                    key={i}
                    avatar={{ source: { uri: l.avatar_url } }}
                    title={l.name}
                    badge={{ value: l.stock, textStyle: { color: 'orange' }, containerStyle: {flex:1, alignItems:'center' } }}
                  />
                ))
              }
            </List>
        </ScrollView>

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

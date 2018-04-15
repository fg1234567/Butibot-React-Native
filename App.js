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

import { StackNavigator } from 'react-navigation';
import ScreenOne from './Screens/ScreenOne';
import ScreenTwo from './Screens/ScreenTwo';


const App = StackNavigator({
    ScreenOne: { screen: ScreenOne},
    ScreenTwo: { screen: ScreenTwo}
})

export default App

 

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import {StackNavigator, TabNavigator} from 'react-navigation';
import FormTest from './src/Screens/FormTest';
import MapTab from './src/Screens/MapTab';

tabs = TabNavigator({
  Test: {
    screen: FormTest,
    swipeEnabled: true,
  },
  Map: {
    screen: MapTab,
    swipeEnabled: true
  }
}, {
  tabBarOptions: {
    activeTintColor: '#FFF',
    labelStyle: {
      fontSize: 15,
    },
    indicatorStyle: {
      backgroundColor: '#0c169c',
      height: 5
    },
    style: {
      backgroundColor: '#0482eb',
    },
  }
})

export default tcc = StackNavigator({
  Home: {
    screen: tabs,
    title: 'Home'
  }
});

AppRegistry.registerComponent('tcc', () => tcc);

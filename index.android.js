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
import Resultado from './src/Screens/Result';
import Home from './src/Screens/Home';

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
    activeTintColor: '#000',
    labelStyle: {
      fontSize: 15,
      color: '#000'
    },
    indicatorStyle: {
      backgroundColor: 'rgba(131, 168, 111, 0.8)',
      height: 5
    },
    style: {
      backgroundColor: 'rgba(183, 237, 154, 0.8)'
    },
  }
})

export default tcc = StackNavigator({
  Home: {
    screen: Home,
    title: 'Home'
  },
  Teste: {
    screen: tabs,
    title: 'teste'
  },
  Resultado: {
    screen: Resultado,
    title: 'Resultado'
  }
});

AppRegistry.registerComponent('tcc', () => tcc);

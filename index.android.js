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
      backgroundColor: '#07715b',
      height: 5
    },
    style: {
      backgroundColor: '#0c9c7d',
    },
  }
})

export default tcc = StackNavigator({
  Home: {
    screen: tabs,
    title: 'Home'
  },
  Resultado: {
    screen: Resultado,
    title: 'Resultado'
  }
});

AppRegistry.registerComponent('tcc', () => tcc);

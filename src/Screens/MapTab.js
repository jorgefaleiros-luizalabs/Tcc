import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class MapTab extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Teste tab 2',
  }
  render() {
    return (
      <View>
        <Text>
          Olá 3
        </Text>
      </View>
    );
  }
}
export default MapTab;

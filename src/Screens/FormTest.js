import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class FormTest extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Teste tab 1',
  }
  render() {
    return (
      <View>
        <Text>
          Olá 2
        </Text>
      </View>
    );
  }
}
export default FormTest;

import React , { Component } from 'react'
import {
  View,
  Text
} from 'react-native'

class Resultado extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    tile: 'Resultado'
  }
  render() {
    return(
      <View>
        <Text>
          ok
        </Text>
      </View>
    );
  }
}
export default Resultado;

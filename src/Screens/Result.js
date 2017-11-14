import React , { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

class Resultado extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    tile: 'Resultado',

  }

  componentWillMount(){
    var header = new Headers({
      'Content-Type': 'application/json'
    });
    var config = {
      method: 'GET',
      headers: header
    };
    fetch('http://10.0.6.162:3000/result/'+ this.props.navigation.state.params.reportId, config)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      var perc = responseJson.result;
      perc = perc.toPrecision(3);
      console.log(perc);
      perc = perc * 100;
      perc = perc.toPrecision(3);
      this.setState({
          result: perc
      })
  })
    .catch((err) => console.log(err));
  }

  render() {
    return(
      <View style={styles.Grid_title}>
        <Text style={styles.fontM}>
          Seu resultado é:
          <Text style={styles.fontG}>
            {this.state.result}
          </Text>
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Grid_title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontM: {
    fontSize: 20
  },
  fontG: {
    fontSize: 28
  }
})
export default Resultado;

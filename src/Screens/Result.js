import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'

class Resultado extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static navigationOptions = {
    tile: 'Resultado',
    headerStyle: {
        backgroundColor: 'rgba(183, 237, 154, 0.8)'
    }
  }

  componentWillMount() {
    var header = new Headers({'Content-Type': 'application/json'});
    var config = {
      method: 'GET',
      headers: header
    };
    fetch('http://192.168.50.39:3000/result/' + this.props.navigation.state.params.reportId, config).then((response) => {
      return response.json();
    }).then((responseJson) => {
      var perc = responseJson.result;
      perc = perc.toPrecision(3);
      console.log(perc);
      perc = perc * 100;
      perc = perc.toPrecision(3);
      this.setState({result: perc})
    }).catch((err) => console.log(err));
  }

  render() {
    return (<View style={styles.Grid_title}>
      <Text style={styles.result_text}>
        Seu resultado é:
      </Text>
      <Text style={styles.result}>
        {this.state.result}%
      </Text>
    </View>);
  }
}
const styles = StyleSheet.create({
  Grid_title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  result_text: {
    flex: 1,
    fontSize: 30,
    marginBottom: 20,
    color: '#000'
  },
  result: {
    flex: 1,
    fontSize: 50,
    color:'#40a867',
    fontWeight: 'bold'
  }
})
export default Resultado;

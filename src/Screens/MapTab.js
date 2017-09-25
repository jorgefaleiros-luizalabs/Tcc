import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';


class MapTab extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let position = navigator.geolocation.getCurrentPosition().then((result)=>{
      this.setState({
        position: result
      });
      console.log(result);
    });
  }
  static navigationOptions = {
    title: 'Teste tab ',
  }
  render() {
    return (
      <View style={{flex:1}}>
        <MapView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
        />

      </View>
    );
  }
}
export default MapTab;

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
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
          error: null,
        }
      });
    });

  }
  static navigationOptions = {
    title: 'Casos na regiãos',
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  render() {
    return (
      <View style={{flex:1}}>
        <MapView
          style={{
            flex:1
          }}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
          region={this.state.region}
        />
        <MapView.Marker
          key={1}
          coordinate={{
            latitude:this.state.region.latitude,
            longitude:this.state.region.longitude
          }}
          title='Você esta aqui!'
          description='Você está aqui!'
        ></MapView.Marker>
      </View>
    );
  }
}
export default MapTab;

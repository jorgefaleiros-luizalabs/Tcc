import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const ASPECT_RATIO = width / height;
const LATITUDE = -20.540158;
const LONGITUDE = -47.405136;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

class MapTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
    };
    this.plotMarkers = this.plotMarkers.bind(this);
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
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }
  plotMarkers(){
    var header = new Headers({
      'Content-Type': 'application/json'
    });
    var config = {
      method: 'GET',
      header: header
    }
    fetch('http://192.168.50.39:3000/reports/position', config)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      result.forEach((row) => {
        this.setState({
          markers: [
            ...this.state.markers,
            {
              coordinate: {
                latitude: row.latitude,
                longitude: row.longitude,
              },
              key: id++,
              color: randomColor(),
            },
          ],
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  componentDidMount() {
    this.plotMarkers()
  }
  static navigationOptions = {
    title: 'Casos na regiãos',
    headerStyle: {
        backgroundColor: 'rgba(183, 237, 154, 0.8)'
    }
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={(e) => this.onMapPress(e)}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            />
          ))}
        </MapView>
        
      </View>
    );
  }
}
MapTab.propTypes = {
  provider: MapView.ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default MapTab;

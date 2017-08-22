import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet
} from 'react-native';

import MapView from 'react-native-maps';

const Api = require('./src/api');

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={this.state.pin}
          />
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    )
  }

  onRegionChangeComplete = (region) => {
    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weather', () => Weather);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Navigation
} from 'react-native-navigation';

import PermissionScreen from './components/PermissionScreen';
import DataCollectionScreen from './components/DataCollectionScreen'

Navigation.registerComponent(`PermissionScreen`, () => PermissionScreen);
Navigation.registerComponent(`DataCollectionScreen`, () => DataCollectionScreen);

Navigation.events().registerAppLaunchedListener(async () => {
  await Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    }
  });
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "PermissionScreen"
            },
          },
        ]
      }
    }
  });
});


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const PERMS = AppleHealthKit.Constants.Permissions;

console.log('PERMS: ', PERMS)

const options = {
  permissions: {
    read: [
      PERMS.DateOfBirth,
      PERMS.Weight,
      PERMS.BodyMassIndex,
      PERMS.SleepAnalysis,
      PERMS.BiologicalSex,
      PERMS.Height,
    ],
  }
};


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      weight: 0,
      bmi: 0,
      gender: '',
      height: 0,
    };
  }

  componentDidMount() {
    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log("error initializing Healthkit: ", err);
        return;
      }
    
      AppleHealthKit.getDateOfBirth(null, (err, results) => {
        this.setState({
          age: results.age,
        });
      });
    });
  }

  render() {
    const { age } = this.state;
    console.log('age: ', age);
    return (
      <View style={styles.container}>
        <Text>Age: {age}</Text>
        <Text>Weight</Text>
        <Text>BMI</Text>
        <Text>Gender</Text>
        <Text>Height</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

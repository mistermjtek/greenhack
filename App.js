/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Button
} from 'react-native-elements'
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';

import shieldIcon from './icons/shield.png'
import colors from './colors';

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
    this.initializeAppleHealthKit = this.initializeAppleHealthKit.bind(this);
  }
  
  initializeAppleHealthKit() {
    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log("error initializing Healthkit: ", err);
        return;
      }
  
      AppleHealthKit.getLatestWeight(null, (err, results) => {
        this.setState({
          weight: results.value,
        });
      });
  
      AppleHealthKit.getLatestBmi(null, (err, results) => {
        this.setState({
          bmi: results.value,
        });
      });
  
      AppleHealthKit.getBiologicalSex(null, (err, results) => {
        this.setState({
          gender: results.value,
        });
      });
  
      AppleHealthKit.getLatestHeight(null, (err, results) => {
        this.setState({
          height: results.value,
        });
      });
    
      AppleHealthKit.getDateOfBirth(null, (err, results) => {
        this.setState({
          age: results.age,
        });
      });
    });

  }

  render() {
    const {
      age,
      weight,
      bmi,
      gender,
      height,
    } = this.state;
    console.log('age: ', age);
    const heightFeet = Math.floor(height/12)
    const heightInches = Math.round(height - (heightFeet * 12))
    return (
      <View style={styles.container}>
        <View style={styles.PermissionScreenContainer}>
          <Image source={shieldIcon} />
          <View style={styles.permissionTextContainer}>
            <Text style={styles.permissionText}>Access to</Text>
            <Text style={styles.permissionText}>Apple Health</Text>
          </View>
          <Button
            buttonStyle={styles.allowButton}
            textStyle={styles.allowButtonText}
            title="ALLOW"
            onPress={this.initializeAppleHealthKit}
          />
        </View>
        {/* <Text>Welcome to Remedy!</Text>
        <Text>Here are the factors we're considering when recommending your cannabis:</Text>
        <Text>Age: {age}</Text>
        <Text>Weight: {weight}</Text>
        <Text>BMI: {bmi}</Text>
        <Text>Gender: {gender}</Text>
        <Text>Height: {heightFeet}' {heightInches}''</Text>
        <Button
          raised
          title = 'See Sleep Analysis'
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  PermissionScreenContainer: {
    backgroundColor: colors.navy,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //
  allowButton: {
    backgroundColor: colors.white,
    borderRadius: 13,
    width: 187,
    height: 50,
  },
  allowButtonText: {
    color: colors.navy,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  permissionText: {
    color: colors.white,
    letterSpacing: 0.54,
    fontSize: 23,
    textAlign: 'center',
  },
  permissionTextContainer: {
    marginTop: 48,
    marginBottom: 48,
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

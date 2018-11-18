import React, {
  Component
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import {
  Button
} from 'react-native-elements';

import profileIcon from '../icons/profile.png';
import colors from '../colors';

const PERMS = AppleHealthKit.Constants.Permissions;

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

class DataCollectionScreen extends Component {
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
    AppleHealthKit.initHealthKit(options, (initErr) => {
      if (initErr) {
        console.log('error initializing Healthkit: ', initErr);
        return;
      }

      AppleHealthKit.getLatestWeight(null, (err, results) => {
        if (err) {
          return;
        }
        this.setState({
          weight: results.value,
        });
      });

      AppleHealthKit.getLatestBmi(null, (err, results) => {
        if (err) {
          return;
        }
        this.setState({
          bmi: results.value,
        });
      });

      AppleHealthKit.getBiologicalSex(null, (err, results) => {
        if (err) {
          return;
        }
        this.setState({
          gender: results.value,
        });
      });

      AppleHealthKit.getLatestHeight(null, (err, results) => {
        if (err) {
          return;
        }
        this.setState({
          height: results.value,
        });
      });

      AppleHealthKit.getDateOfBirth(null, (err, results) => {
        if (err) {
          return;
        }
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
    const heightFeet = Math.floor(height / 12);
    const heightInches = Math.round(height - (heightFeet * 12));
    return (
      <View style={styles.container}>
        <Text style={styles.title}>DATA COLLECTED</Text>
        <View style={styles.dataContainer}>
          <Image source={profileIcon} />
          <View>
            <Text style={styles.dataKey}>Age</Text>
            <Text style={styles.dataValue}>{age}</Text>
          </View>
          <View>
            <Text style={styles.dataKey}>Gender</Text>
            <Text style={styles.dataValue}>{gender}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Image source={profileIcon} />
          <View>
            <Text style={styles.dataKey}>Height</Text>
            <Text style={styles.dataValue}>{heightFeet}' {heightInches}''</Text>
          </View>
          <View>
            <Text style={styles.dataKey}>Weight</Text>
            <Text style={styles.dataValue}>{weight}</Text>
          </View>
          <View>
            <Text style={styles.dataKey}>BMI</Text>
            <Text style={styles.dataValue}>{bmi}</Text>
          </View>
        </View>
        <Button
          raised
          title='CONFIRM'
          buttonStyle={styles.confirmButton}
          textStyle={styles.confirmButtonText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.navy,
    flex: 1,
  },
  confirmButton: {
    marginTop: 75,
    backgroundColor: colors.white,
    borderRadius: 13,
    width: 187,
    height: 50,
  },
  confirmButtonText: {
    color: colors.navy,
    fontWeight: 'bold',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 190,
    marginBottom: 47,
  },
  dataKey: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '300',
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.48,
    marginBottom: 104,
  }
});

export default DataCollectionScreen;

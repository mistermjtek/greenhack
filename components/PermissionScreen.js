import React from 'react';
import {
  // StyleSheet,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  Button
} from 'react-native-elements';
import {
  Navigation
} from 'react-native-navigation';

import shieldIcon from '../icons/shield.png';
import colors from '../colors';

const PermissionScreen = ({
  componentId
}) => (
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
      onPress={() => {
        Navigation.push(componentId, {
          component: {
            name: 'DataCollectionScreen',
          }
        });
      }}
    />
  </View>
);

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
});


export default PermissionScreen;

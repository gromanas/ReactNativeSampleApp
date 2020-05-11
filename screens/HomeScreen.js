/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import {testProperties} from '../services/automation';

function HomeScreen({navigation}) {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} {...testProperties('home-screen', true)}>
          <Text>Home Screen</Text>
          <Button
              title="Go to Login Screen"
              onPress={() => navigation.navigate("Login") }
              {...testProperties('go-to-login-screen-btn')}
          />
      </View>
  );
};


export default HomeScreen;

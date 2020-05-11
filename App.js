/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  ActivityIndicator
} from 'react-native';

import LogoutScreen from './screens/LogoutScreen';
import { AuthContext } from './component/context'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (userName, password) => {
      let userToken;
      userToken = null;
      // const userToken = String(foundUser[0].userToken);
      // const userName = foundUser[0].username;

      if(userName === 'user' && password === 'pass'){
        userToken = 'test';
      }
      console.log('user token:>>>>>>', userToken);
      dispatch({type: 'LOGIN', id: userName, token: userToken});
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'LOGIN', id: userName, token: userToken});
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
  }), []);

  useEffect(() => {
    setTimeout( async () => {
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
    );
  }

  return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {console.log(loginState.userToken)}
          { loginState.userToken == null ? (
              <Stack.Navigator screenOptions ={{
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: "#3498DB"
                },
                headerTintColor: "#ffffff",
                headerTitleStyle: {
                  fontWeight: "bold"
                },
              }}>
                <Stack.Screen name="Home" component={HomeScreen} options={{
                  title: 'Welcome to React Native Sample App',
                }}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{
                  title: 'Login',
                }}/>
              </Stack.Navigator>
          ) : (
              <Stack.Navigator screenOptions ={{
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: "#3498DB"
                },
                headerTintColor: "#ffffff",
                headerTitleStyle: {
                  fontWeight: "bold"
                },
              }}>
                <Stack.Screen name="Logout" component={LogoutScreen} options={{
                  title: 'Logout',
                }}/>
              </Stack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
  );
};

export default App;

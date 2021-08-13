import React, { useState, useReducer, createContext} from  'react';
import { Provider } from 'react-native-paper';
import App from './src';

import AsyncStorage from '@react-native-community/async-storage'
import AuthContext from './src/components/Context'

import LoginNavigator from './src/navigator/LoginNavigator';
import HomeNavigator from './src/navigator/HomeNavigator';

import { theme } from './src/core/theme';

//import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Dashboard from './src/screens/Dashboard'
import { setNavigator } from './src/navigationRef'

const Main = () => {
  // Create initial state of user
  const initialLoginState = {
    isLoading: true,
    username: null,
    token: null,
    deviceID: null,
    topics: null,
    userId: null,
  };

// cases of methods for login, logout, register. 
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          username: action.username,
          token: action.token,
          deviceID: action.deviceID,
          topics: action.topics,
          userId: action.userId,
          isLoading: false,
        };
      case 'LOGIN': 

        return {
          ...prevState,
          username: action.username,
          token: action.token,
          deviceID: action.deviceID,
          topics: action.topics,
          userId: action.userId,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          username: null,
          token: null,
          deviceID: null,
          topics: null,
          userId: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          username: action.id,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState); //set initial user's state

  const authContext = React.useMemo(() => ({
    // If there is user found during login, store user details/state in async storage so user do not have to login everytime open the app
    signIn: async(foundUser) => {
      const { deviceID, topics, userId, username, token } = foundUser
      console.log(deviceID)

      if( token!=='error'){
        try {
          // const items = [['deviceID', deviceID], ['scope',JSON.stringify(scope)], ['topics',JSON.stringify(topics)], ['userId',String(userId)], ['username', username], ['token', token]]
          // await AsyncStorage.multiSet( items);
         const items = {'deviceId':deviceID, 'topics':topics, 'userId': userId, 'username': username, 'token':token }

         await AsyncStorage.setItem('user', JSON.stringify(items)) 

         dispatch({ type: 'LOGIN', deviceID:deviceID, topics:topics, userId:userId, username: username, token: token , topic:'1000/data'});
        } catch(e) {
          console.log(e);
        }
      }
    },
    // Remove user's details/state in storage when user logout
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('user');
      } catch(e) {
        console.log(e);
      }
      // client.end()
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
  }), []);

  return(
  <Provider theme={theme}>
    <AuthContext.Provider  value={authContext}>
      {loginState.token !== null ?
      <HomeNavigator />
      :
      <LoginNavigator />
      }
    </AuthContext.Provider>
  </Provider>
  )
};

const switchNavigator = createSwitchNavigator({
  mainFlow: createBottomTabNavigator({
    MapView: Dashboard,
  })
})

export default Main;

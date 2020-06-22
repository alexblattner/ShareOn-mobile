import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import Header from './Header.js';
import Main from './Main';
import Login from './Login';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen options={{ headerStyle: { height: 100},headerTitle: props => <Header /> }} name="Main">
          {props => <Main url='http://192.168.0.13/ShareOn/geters/postsload.php'/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

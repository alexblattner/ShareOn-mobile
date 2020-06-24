import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AsyncStorage } from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import Header from './Header.js';
import Main from './Main';
import Login from './Login';

const Stack = createStackNavigator();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={user:{}};
    this.getData();
  }
  getData=async ()=>{
    try{
      const value=await AsyncStorage.getItem("user");
      if(value!==null)
      this.setState({user:value});
    }catch(e){
      console.log(e);
    }
  }
  componentDidMount() {
    fetch('http://192.168.0.13/ShareOn/logCheck.php')
    .then(d=>d.text())
      .then(data => this.setState({data}));
  }
  logSet=async(data)=>{
    try{
      this.setState({user:data});
      await AsyncStorage.setItem('user',this.state.user);
    }catch(e){
      console.log(e);
    }
  }
  render()  {
    if(Object.keys(this.state.user).length === 0 && this.state.user.constructor === Object){
      return <Login log={this.logSet} />;
    }else{
      return <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen options={{ headerStyle: { height: 100},headerTitle: props => <Header /> }} name="Main">
                  {props => <Main url='http://192.168.0.13/ShareOn/geters/postsload.php'/>}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>;
    }
  }
}
export default App;

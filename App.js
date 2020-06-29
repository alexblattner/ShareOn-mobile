import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAsyncStorage } from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import Header from './Header.js';
import Main from './Main';
import Login from './Login';

const Stack = createStackNavigator();
function App(){
  const [user, setUser] = useState({});
  const [load,setLoad]=useState(false);
  const { getItem, setItem } = useAsyncStorage('userBox');

  const isLoggedIn=async()=>{
    const res=await fetch('http://192.168.0.13/ShareOn/logCheck.php');
    return (res==1)?true:false;
  }
  const readItemFromStorage = async () => {
    const item = await getItem();
    setUser(JSON.parse(item)||user); // if item=="null", then just use value
    const log=await isLoggedIn();
    if(!log){
      console.log(1);
      if(item!=null){
        console.log(2);
        let fd=new FormData();
        fd.append("username",user.username);
        fd.append("password",user.password);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://192.168.0.13/ShareOn/loger.php', true);
        let t=this;
        xhr.onload = function() {
        if (this.status == 200) {
          if(this.response=="")
          setUser({});
        }
        };
        xhr.send(fd);
      }else{
        setUser({});
      }
    }
  };

  const writeItemToStorage = async newValue => {
    await setItem(JSON.stringify(newValue));
    setUser(newValue);
  };
  useEffect(() => {
    readItemFromStorage();
    setLoad(false);
  }, []);
  
  if(!load){
    if(Object.keys(user).length === 0 && user.constructor === Object){
      return <Login log={writeItemToStorage} />;
    }else{
      return <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen options={{ headerStyle: { height: 100},headerTitle: props => <Header /> }} component={Main} name="Main"/>
                <Stack.Screen name="Post" component={Main}/>
              </Stack.Navigator>
            </NavigationContainer>;
    }
  }else{
    return <Text>Loading</Text>;
  }
}
export default App;

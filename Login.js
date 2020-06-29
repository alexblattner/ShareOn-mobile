import React from 'react';
import { StyleSheet,Text,View,TextInput,TouchableOpacity,Image} from 'react-native';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      password:""
    };

  }
  onButtonPress=()=>{
    let fd=new FormData();
    fd.append("username",this.state.username);
    fd.append("password",this.state.password);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.0.13/ShareOn/loger.php', true);
    let t=this;
    xhr.onload = function() {
    if (this.status == 200) {
      console.log(this.response);
      let o=JSON.parse(this.response);
      o.password=t.state.password;
      t.props.log(o);
    }
    };
    xhr.send(fd);
  }
  render() {
    return <View style={styles.container}>
              <View style={{height:150,width:300}}>
                <Image source={require('./icons/logo-white.png')} style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} />
              </View>
              <TextInput style = {styles.input}
                 autoCapitalize="none"
                 onSubmitEditing={() =>this.passwordInput.focus()}
                 onChangeText={(username)=>this.setState({username})}
                 autoCorrect={false}
                 keyboardType='email-address'
                 returnKeyType="next"
                 placeholder='enter your username'
                 placeholderTextColor='rgba(225,225,225,0.7)'/>

                 <TextInput style = {styles.input}
                  returnKeyType="go"
                  ref={(input)=> this.password = input}
                  onChangeText={(password)=>this.setState({password})}
                  placeholder='Password'
                  placeholderTextColor='rgba(225,225,225,0.7)'
                  value={this.state.password}
                  secureTextEntry/>
                  <TouchableOpacity style={styles.buttonContainer}
                       onPress={this.onButtonPress}>
                       <Text style={styles.buttonText}>LOGIN</Text>
                  </TouchableOpacity>
                  <Text>{this.a}</Text>
          </View>;
  }
}
const styles = StyleSheet.create({
  container: {
     padding: 20,
     backgroundColor:'rgb(20, 52, 99)',flex: 1,width: null,height: null,resizeMode: 'contain',
    },
    textLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
        marginBottom: 10,
        color: '#595856'
    },
    input:{
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        color: 'black'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});

export default Login;

import React from 'react';
import { StyleSheet,
  Text,
  View,
  TextInput,TouchableOpacity,Image} from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state={data:0};
  }
  componentDidMount() {
    fetch('http://192.168.0.13/ShareOn/logCheck.php')
    .then(d=>d.text())
      .then(data => this.setState({data}));
  }
  onButtonPress(){

  }
  render() {
    if(this.state.data==0){
    return <View style={styles.container}>
    <View style={{height:150,width:300}}>
    <Image source={require('./icons/logo-white.png')} style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} />
    </View>
    <TextInput style = {styles.input}
       autoCapitalize="none"
       onSubmitEditing={() => this.passwordInput.focus()}
       autoCorrect={false}
       keyboardType='email-address'
       returnKeyType="next"
       placeholder='enter your username'
       placeholderTextColor='rgba(225,225,225,0.7)'/>

<TextInput style = {styles.input}
      returnKeyType="go"
      ref={(input)=> this.passwordInput = input}
      placeholder='Password'
      placeholderTextColor='rgba(225,225,225,0.7)'
      secureTextEntry/>

<TouchableOpacity style={styles.buttonContainer}
             onPress={this.onButtonPress}>
     <Text  style={styles.buttonText}>LOGIN</Text>
</TouchableOpacity>
          </View>;
        }else {
          this.props.navigation.navigate('Home');
        }
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

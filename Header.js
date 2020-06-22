import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground,Dimensions } from 'react-native';
import background from './icons/space.jpg';

export default function App() {
  return (
      <ImageBackground source={background} style={styles.background}>
      <View style={styles.logoc}>
      <Image source={require('./icons/logo-white.png')} style={styles.logo} />
      </View>
      <View style={styles.transHeader}>
        <View style={styles.choices}>
          <Text style={wallselect}>MY WALL</Text>
          <Text style={styles.all}>ALL POSTS</Text>
        </View>
      </View>
      </ImageBackground>
  );
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    flexDirection: 'column',
    alignItems: 'center',width:width,height:100,marginTop:-24,marginLeft:-16
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  logoc:{
    height:70,
    width:200
  },
  transHeader:{
    height:30,
    backgroundColor: 'rgba(2, 21, 61,0.95)',
    width:360,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
  },
  choices:{
    flexDirection: 'row',
    width:150,height:32,paddingTop:5
  },
  wall:{
    color:"white",
    fontWeight: 'bold',
    fontSize: 15,
  },
  all:{
    color:"white",
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft:10
  },
  selected:{
    color:"rgb(148,198,233)",
    borderBottomWidth :4,
    borderBottomColor: 'rgb(148,198,233)',
  }
});
const wallselect = StyleSheet.flatten([
  styles.wall,
  styles.selected
]);

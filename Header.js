import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground,Dimensions } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import background from './icons/space.jpg';

export default function Header() {
  const { getItem, setItem } = useAsyncStorage('userBox');
  const [load,setLoad]=useState(true);
  const [user, setUser] = useState({});
  useEffect(() => {
    readItemFromStorage();
    setLoad(false);
  }, []);
  const readItemFromStorage = async () => {
    const item = await getItem();
    setUser(JSON.parse(item)||user); // if item=="null", then just use value
  };
  let profile;
  if(!load){
    console.log(22222222);
    console.log(user);
    profile=<View style={{borderRadius:100,width:30,height:30,alignSelf:"flex-end",background:"white",position:"absolute",top:25,right:10}}>
              <Image source={require('./icons/logo-white.png')} style={styles.logo}/>
            </View>;
  }
  return (
      <ImageBackground source={background} style={styles.background}>
      <View style={styles.logoc}>
      <Image source={require('./icons/logo-white.png')} style={styles.logo} />
      </View>
      {profile}
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
    height:70,top:0,
    width:200,position:"absolute"
  },
  transHeader:{
    height:30,
    backgroundColor: 'rgba(2, 21, 61,0.95)',
    width:360,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',position:"absolute",bottom:0  },
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

import React,{useState,useEffect} from 'react';
import Post from './Post.js';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import Header from './Header.js';

export default function Main(props) {
  const [data, setData] = useState([]);
  const [load,setLoad]=useState(true);
  const [comment,setComment]=useState(false);
  const boot=async()=>{
      const r=await fetch('http://192.168.0.13/ShareOn/geters/postsload.php').then(data=> data.json());
          setData(r);
          setLoad(false);
  }
  const post=async(key)=>{
    let fd=new FormData();
    fd.append("key",key);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.0.13/ShareOn/geters/postload.php', true);
    xhr.onload = function() {
    if (this.status == 200) {
      let arr=JSON.parse(this.response);
      arr=[arr];
      let xh = new XMLHttpRequest();
      xh.open('POST', 'http://192.168.0.13/ShareOn/geters/commentsload.php', true);
      xh.onload = function() {
      if (this.status == 200) {
        let cr=JSON.parse(this.response);
        let f=arr.concat(cr);
        setData(f);
        setComment(true);
        setLoad(false);
      }
      };
      xh.send(fd);
    }
    };
    xhr.send(fd);
  }
  useEffect(() => {
    if(!props.navigation.canGoBack())
      boot();
    else{
      post(props.route.params.key);
    }
  }, []);
  const navigate=(d)=>{
    props.navigation.navigate('Post',{key:d});
  }
    if(load)
    return <ScrollView style={styles.container}></ScrollView>;
    if(comment){
      console.log(data);
      let i=0;
      return <ScrollView style={styles.container}>
      {data.map((post,i) => (
        <View style={{paddingBottom:10,paddingTop:10}}>
        <Post data={post} navigate={navigate} comment={(i==0)?false:true}/>
        </View>
      ))}
      </ScrollView>;
    }
    return <ScrollView style={styles.container}>
    {data.map(post => (
      <View style={{paddingBottom:10,paddingTop:10}}>
      <Post data={post} navigate={navigate} comment="true"/>
      </View>
    ))}
    </ScrollView>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(20, 52, 99)',
  },
});

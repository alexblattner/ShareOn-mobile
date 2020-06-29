import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Button, Dimensions,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
function Post(props){
  console.log(props);
  const [data, setData] = useState({});
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    setData(props.data);
    setLoading(false);
  }, []);
  const upvote=()=>{
    let fd=new FormData();
    fd.append("key",data._key);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.0.13/ShareOn/writers/postupcount.php', true);
    xhr.onload = function() {
    if (this.status == 200) {
      let o=data;
      let r=JSON.parse(this.response);
      o['vote']=r.vote;
      o['upvotes']=r.upvote;
      o['downvotes']=r.downvote;
      setData(o);
    }
    };
    xhr.send(fd);
  }
  const downvote=()=>{
    let fd=new FormData();
    fd.append("key",data._key);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://192.168.0.13/ShareOn/writers/postdowncount.php', true);
    let t=this;
    xhr.onload = function() {
    if (this.status == 200) {
      let o=data;
      o['vote']=this.response.vote;
      o['upvotes']=this.response.upvote;
      o['downvotes']=this.response.downvote;
      setData(o);
    }
    };
    xhr.send(fd);
  }

  const timeSince=(date)=> {
  	date*=1000;
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 86400);
    if(interval >7){
    	let d=new Date(date);
    	let m=d.getMonth()+1;
    	let min=d.getMinutes();
    	let h=d.getHours();
    	let y=d.getFullYear();
    	d=d.getDate();
    	if (m===1)
    		m="January";
    	else if(m=== 2)
    		m="February";
    	else if(m===3)
    		m="March";
    	else if(m===4)
    		m="April";
    	else if(m===5)
    		m="May";
    	else if(m===6)
    		m="June";
    	else if(m===7)
    		m="July";
    	else if(m===8)
    		m="August";
    	else if(m===9)
    		m="September";
    	else if(m===10)
    		m="October";
    	else if(m===11)
    		m="November";
    	else if(m===12)
    		m="December";
    	let c=new Date();
    	h=(h<10)?"0"+""+h:h;
    	min=(min<10)?"0"+""+min:min;
    	if(y!==c.getFullYear())
    	return m+" "+d+" "+y;
    	else
    	return m+" "+d+" at "+h+":"+min;
    }
    if (interval > 1) {
      return interval + " days ago";
    }
    if (interval === 1) {
      return interval + " day ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    if (interval === 1) {
      return interval + " hour ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    if (interval === 1) {
      return interval + " minute ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  const is_url=(str)=> {
    try {
      new URL(str);
    } catch (_) {
      return false;
    }

    return true;
  }
  const comment =()=>{
    props.navigate(data._key);
  }
  /*if(Object.keys(this.state.user).length === 0 && this.state.user.constructor === Object){
      fetch('http://192.168.0.13/ShareOn/logCheck.php')
      .then(d=>d.text())
        .then(user => this.logSet(user));
    }
  }*/
  if(!loading){
  const pload="http://192.168.0.13/ShareOn/post-types/"+data['type']+"/"+data['frame']['process']+"?key="+data['_key'];
  const scroll=(data['frame']['scroll'])?"yes":"no";
  const size=(data['frame']['size']==0)?"":"height='"+data['frame']['size']+"'";
  return (
      <View style={(props.comment==true)?styles.comment:styles.post} key={data._key}>
        <View style={styles.row}>
          <View style={{width:20}} />
            <View style={styles.picture}>
              <Image style={{flex: 1,width: null,height: null,resizeMode: 'contain',backgroundColor:"black",borderRadius:100}} source={{uri:data.profile.picture}}/>
            </View>
          <View style={{paddingLeft:10,paddingTop:10}}>
            <Text style={styles.texts}>By: {data.profile.name}</Text>
            <Text style={styles.texts}>Published: {timeSince(data.time)}</Text>
          </View>
          <View style={styles.points}>
            <TouchableOpacity onPress={upvote} style={styles.voteButton}>
              <View style={{height:20,width:20}}>
                <Image style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={(data['vote']===1)?require('./icons/upvote1.png'):require('./icons/upvote0.png')  }/>
              </View>
              <Text style={voteAmount}>{data.upvotes}</Text>
            </TouchableOpacity>
            <View style={{width:10}} />
            <TouchableOpacity onPress={downvote} style={styles.voteButton}>
              <View style={{height:20,width:20}}>
                <Image style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={(data['vote']===-1)?require('./icons/downvote1.png'):require('./icons/downvote0.png')  }/>
              </View>
              <Text style={voteAmount}>{data.downvotes}</Text>
            </TouchableOpacity>
          </View>
          <View style={{height:35,width:35,paddingTop:15,paddingRight:15}}><Image style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={require('./icons/clockwork.png')}/></View>
        </View>
          <WebView style={{height:200,alignItems: 'stretch',flex:1,paddingLeft:40}} originWhitelist={['*']} source={{ html: "<iFrame style='height:100%;width:100%' src='"+pload+"' />" }}/>
          <TouchableOpacity onPress={comment} style={styles.row}>
            <View style={{height:35,width:35,paddingTop:7.5,paddingBottom:7.5,paddingLeft:15}}>
              <Image style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={require('./icons/Comments.png')}/>
            </View>
          </TouchableOpacity>
      </View>
  );
}else{
  return <View style={styles.innerPost} />;
}
}
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  points:{
    flexDirection: 'row',
    alignItems: 'flex-start',paddingLeft:5,paddingTop:10,flex:1
  },
  row:{
    flexDirection: 'row',flex:1
  },
  voteButton:{height:30,paddingLeft:5,paddingRight:5,
    paddingTop:2.5,borderWidth:1,flexDirection: 'row',
    alignItems: 'flex-start',borderColor:"lightgrey"},
  voteAmount:{
    paddingLeft:5,
    paddingTop:5
  },
  texts:{fontSize:10},
  picture:{height:50,width:50,borderRadius:100,paddingTop:5},
  post:{
    backgroundColor:"white",
  },
  comment:{
    backgroundColor:"white",width:width-20,marginLeft:10
  }
});

const voteAmount=StyleSheet.flatten([
  styles.voteAmount,
  styles.texts
]);

export default Post;

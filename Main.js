import React from 'react';
import Post from './Post.js';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    fetch(this.props.url)
    .then(data=> data.json())
      .then(data => this.setState({ hits: data, isLoading: false }));
  }
  render() {
    const { hits, isLoading } = this.state;
    if(isLoading)
    return <ScrollView style={styles.container}></ScrollView>;
    return <ScrollView style={styles.container}>
    {hits.map(post => (
      <View style={{paddingBottom:10,paddingTop:10}}>
      <Post data={post} comment="true"/>
      </View>
    ))}
    </ScrollView>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(20, 52, 99)',
  },
});

export default Main;

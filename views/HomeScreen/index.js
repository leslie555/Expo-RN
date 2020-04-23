import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { withNavigation } from 'react-navigation';


class HomeScreen extends React.Component {
  
  goDetails = ()  =>{
    this.props.navigation.navigate('Details', {
      parm1: "hepburn"
    })
  }
  changeTitle = ()  =>{
    this.props.navigation.setOptions({ title: 'Updated!' })
  }
  createPost = ()  =>{
    this.props.navigation.navigate('CreatePost')
  }
  toProfile = ()  =>{
    this.props.navigation.navigate('Profile', {name: 'dynamicTitle'})
  }
  goTab = ()  =>{
    this.props.navigation.navigate('TabDemo', {name: 'Tab'})
  }

  render() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      
      <Text style={{ margin: 10 }}>Post: {this.props.route.params?.post}</Text>
      <Button onPress={this.changeTitle} title="changeTitle" > </Button>
      <Button onPress={this.goDetails} title="go to Details with params " > </Button>
      <Button onPress={this.createPost} title="push to CreatePost " > </Button>
      <Button onPress={this.toProfile} title="go to profile " > </Button>
      <Button onPress={this.goTab} title="go to TabDemo with params " > </Button>
    </View>
  );
}
}
export default HomeScreen
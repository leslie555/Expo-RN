import * as React from 'react';
import { View, Text, Image, Button,TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';
import DetailsScreen from './views/Details';
import CreatePost from './views/CreatePost';
import Profile from './views/Profile';
import TabDemo from './views/TabDemo';

function LogoTitle() {
  return (
    <Text>Logo</Text>
    // <Image
    //   style={{ width: 250, height: 40 }}
    //   source={{uri:'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3880341262,3308316348&fm=26&gp=0.jpg'}}
    // />
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#49f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={
          ({ navigation, route }) => ({
            headerTitle: props => <LogoTitle {...props} />,
            headerBackTitle: '返回'
          })
       }/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'detailsLeslie', headerBackTitle: '返回' }} />
        <Stack.Screen name="CreatePost" component={CreatePost} options={{ title: 'post' }} />
        <Stack.Screen name="TabDemo" component={TabDemo} options={{ title: 'TabDEmo' }} />
        <Stack.Screen name="Profile" component={Profile} options={({ route }) => ({ title: route.params.name })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  btn:{
    width: 50,
    height:30,
    backgroundColor:'pink',
    borderRadius: 5
  }
})
import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DetailsScreen from '../Details';
import CreatePost from '../CreatePost';

const Tab = createBottomTabNavigator();
export default function Profile({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={DetailsScreen} />
      <Tab.Screen name="Messages" component={CreatePost} />
    </Tab.Navigator>
  );
}
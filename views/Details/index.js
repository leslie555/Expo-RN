import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function DetailsScreen({route, navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>{route.params?.parm1}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="back" onPress={() => {navigation.goBack()}}></Button>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}
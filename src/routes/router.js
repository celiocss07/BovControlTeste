import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Update from '../screens/Update';
import Create from '../screens/Create';


const Stack = createNativeStackNavigator();
export default function Routers() {
  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='Home' >
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Update" component={Update}  />
        <Stack.Screen name="Create" component={Create}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
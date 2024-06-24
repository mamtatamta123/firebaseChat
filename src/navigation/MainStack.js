import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import FacebookLogin from '../screens/FacebookLogin';
import FirebaseLogin from '../screens/fireStore/FirebaseLogin';
import FirebaseSignup from '../screens/fireStore/FirebaseSignup';
import UserList from '../screens/fireStore/UserList';
import UserChat from '../screens/fireStore/UserChat';
const Stack = createNativeStackNavigator();
const MainStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="FacebookLogin" component={FacebookLogin} />
        <Stack.Screen name="FirebaseLogin" component={FirebaseLogin} />
        <Stack.Screen name="FirebaseSignup" component={FirebaseSignup} />
        <Stack.Screen name="UserList" component={UserList} />
        <Stack.Screen name="UserChat" component={UserChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;

const styles = StyleSheet.create({});

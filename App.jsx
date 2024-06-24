import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Login from './src/screens/Login';
import MainStack from './src/navigation/MainStack';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import UserList from './src/screens/fireStore/UserList';
import FirebaseLogin from './src/screens/fireStore/FirebaseLogin';

const App = () => {


  useEffect(() => {
    getDeviceToken();
    // checklogin();
    // const navigation = useNavigation();
  }, []);

    // const checklogin = async () => {
    //   const name = await AsyncStorage.getItem('NAME');
    //   if (name) {
    //     navigation.navigate('UserList');
    //   } else {
    //     navigation.navigate('FirebaseLogin');
    //   }
    // };

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    console.log('========Device FCM -----Token=======', token);
  };

  return <MainStack />;
};

export default App;

const styles = StyleSheet.create({});

// useEffect(() => {
//   notificationListeners();
// }, []);

// async function notificationListeners() {
//   console.log('hello');
//   //On forground====
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     console.log('onMessage=====', remoteMessage);
//   });
//   //On backGraound=========

//   const unsubscribeOnBackgroundMessage =
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//       console.log('setBackgroundMessageHandler=====', remoteMessage);
//       NotificationOnScreen(remoteMessage);
//     });

//   return unsubscribe;
// }

// const NotificationOnScreen = async remoteMessage => {
//   const channelId = await notifee.createChannel({
//     id: 'default 4',
//     name: 'Default Channel 4',
//     importance: AndroidImportance.HIGH,
//   });
//   await notifee.displayNotification({
//     title: remoteMessage.data.title,
//     body: remoteMessage.data.body,
//     android: {
//       channelId,
//     },
//   });
// };

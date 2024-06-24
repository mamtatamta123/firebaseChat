import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export default function UserList() {
  const [userListData, setUserListData] = useState([]);
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('user')
      .where('email', '!=', email)
      .get()
      .then(res => {
        console.log('res.docs[0].data()----', res.docs[0].data());
        setUserListData(res.docs);
      })
      .catch(e => {
        console.log('error==', e);
      });
  };
  return null;
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {userListData.map(() => {
          return (
            <TouchableOpacity
              style={{
                height: 55,
                width: '100%',
                borderWidth: 2,
                borderColor: '#000',
                borderRadius: 6,
              }}></TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

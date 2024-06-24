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
import UserChat from './UserChat';

export default function UserList({navigation}) {
  const [userListData, setUserListData] = useState([]);
  const [myId, setmyId] = useState('');
  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    const id = await AsyncStorage.getItem('ID');
    setmyId(id);
    firestore()
      .collection('user')
      .where('email', '!=', email)
      .get()
      .then(res => {
        res.docs.map(item => {
          tempData.push(item.data());
        });
        setUserListData(tempData);
      })
      .catch(e => {
        console.log('error==', e);
      });
  };
  // return null;
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          color: '#000',
          fontSize: 17,
          fontWeight: '500',
          alignSelf: 'center',
          paddingVertical: 20,
        }}>
        Chat With
      </Text>
      <ScrollView
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
          paddingVertical: 30,
        }}>
        {userListData.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserChat', {userData: item, myId: myId});
              }}
              style={{
                height: 55,
                width: '100%',
                borderWidth: 1.5,
                borderColor: '#000',
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#000', fontSize: 17, fontWeight: '500'}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

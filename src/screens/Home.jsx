import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Home = ({navigation}) => {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await AsyncStorage.getItem('USER_DATA');
    setUserInfo(JSON.parse(res));
    console.log('getitem', res);
  };

  const signout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {userInfo ? (
        <View
          style={{
            paddingHorizontal: 15,
            flex: 1,
            alignItems: 'center',
            marginTop: '20%',
          }}>
          <Image
            source={{uri: userInfo.photo}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
          <Text style={{color: 'black', fontSize: 20, marginTop: 20}}>
            {userInfo.name}
          </Text>
          <Text style={{color: 'black', marginTop: 5}}>{userInfo.email}</Text>

          <TouchableOpacity
            onPress={signout}
            style={{
              height: 55,
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 6,
              elevation: 6,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 'auto',
              marginBottom: '10%',
            }}>
            <Text style={{color: '#000', fontWeight: '400'}}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#000'} size={35} />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

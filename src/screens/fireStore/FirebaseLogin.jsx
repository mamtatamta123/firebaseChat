import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import FirebaseSignup from './FirebaseSignup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserList from './UserList';
const FirebaseLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const LoginUser = () => {
  //   firestore()
  //     .collection('user')
  //     .where('email', '==', email)
  //     .get()
  //     .then(res => {
  //       console.log('data===', JSON.stringify(res));
  //       // navigation.replace('UserChatScreen');
  //     })
  //     .catch(e => {
  //       ToastAndroid.show('Invalid credntials',ToastAndroid.SHORT);
  //       console.log('error of login', e);
  //     });
  // };

  const LoginUser = () => {
    // console.log('email', email);
    firestore()
      .collection('user')
      .where('email', '==', email)
      .get()
      .then(res => {
        console.log('dataaaaaaaaaaaaa', res.docs[0].data());
        if (!res.empty) {
          const userData = res.docs[0].data();
          saveData(userData.name, userData.email, userData.userId);
        } else {
          // No user found
          ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
        }
      })
      .catch(e => {
        ToastAndroid.show('Invalid credentials', ToastAndroid.SHORT);
        console.log('Error logging in:', e);
      });
  };

  const saveData = async (name,email,id) => {
    await AsyncStorage.setItem('NAME',name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('ID', id);
    navigation.navigate('UserList')
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', paddingVertical: 50}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Login
        </Text>
      </View>

      <TextInput
        value={email}
        placeholder="Enter email"
        placeholderTextColor={'black'}
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        value={password}
        placeholder="Enter password"
        placeholderTextColor={'black'}
        style={styles.input}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={LoginUser}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('FirebaseSignup')}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: '500',
            textDecorationLine: 'underline',
          }}>
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 15,
    paddingLeft: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 15,
    height: 50,
    marginTop: 40,
  },
});

export default FirebaseLogin;

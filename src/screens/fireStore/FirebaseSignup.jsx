import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import FirebaseLogin from './FirebaseLogin';

const FirebaseSignup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUSer = () => {
    const userId = uuid.v4();
    firestore()
      .collection('user')
      .doc(userId)
      .set({
        name: name,
        password: password,
        phone: phone,
        email:email,
        userId: userId,
      })
      .then(res => {
        ToastAndroid.show('Profile created successfully!', ToastAndroid.SHORT);
        console.log('user created', res);
        navigation.navigate('FirebaseLogin')
      })
      .catch(e => {
        console.log('e', e);
      });
  };

  // const registerUSer1 = async () => {
  //   const userId = uuid.v4();
  //   try {
  //     await firestore().collection('user').doc(userId).set({
  //       name: name,
  //       email: email,
  //       password: password,
  //       phone: phone,
  //       userId: userId,
  //     });
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const validate = () => {
    isValid = true;

    if (!name) {
      console.log('name errror');
      isValid = false;
    }

    if (!email) {
      console.log('email e');

      isValid = false;
    }

    if (!phone) {
      console.log('phone e');

      isValid = false;
    }

    if (!password) {
      console.log('password e');

      isValid = false;
    }

    if (!confirmPassword) {
      console.log('password e');

      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };

  const Signup = () => {
    const res = validate();
    if (res) {
       registerUSer();
    
    } else {
      Alert.alert('please enter correct data');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignItems: 'center', paddingVertical: 50}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Signup
        </Text>
      </View>
      <TextInput
        value={name}
        placeholder="Enter name"
        placeholderTextColor={'black'}
        style={styles.input}
        onChangeText={text => setName(text)}
      />
      <TextInput
        value={email}
        placeholder="Enter email"
        placeholderTextColor={'black'}
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        value={phone}
        maxLength={10}
        placeholder="Enter phone number"
        placeholderTextColor={'black'}
        style={styles.input}
        onChangeText={text => setPhone(text)}
        keyboardType={'number-pad'}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        placeholderTextColor={'black'}
        style={styles.input}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        value={confirmPassword}
        placeholder="Confirm password"
        placeholderTextColor={'black'}
        style={styles.input}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={() => Signup()} style={styles.button}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
          Signup
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 20}}
        onPress={() => navigation.navigate('FirebaseLogin')}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: '500',
            textDecorationLine: 'underline',
          }}>
          Login
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

export default FirebaseSignup;

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const FacebookLogin = () => {
  const [userData, setUserData] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loder, setLoader] = useState(false);

  const facebookLogin = async () => {
    setLoader(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        setLoader(false);

        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        setLoader(false);
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const userCredential = await auth().signInWithCredential(
        facebookCredential,
      );
      console.log('userCredential----', userCredential.user);
      // Update userData state with user data
      setUserData(userCredential.user);
      setLoader(false);
      // Update profileImage state with profile picture URL if available
      if (userCredential.additionalUserInfo?.profile?.picture?.data?.url) {
        setProfileImage(
          userCredential.additionalUserInfo.profile.picture.data.url,
        );
      }
    } catch (error) {
      setLoader(false);

      console.log('Facebook login error:', error);
    }
  };

  const facebookLogout = async () => {
    try {
      await auth().signOut();
      LoginManager.logOut();
      setUserData('');
      setProfileImage('');
      console.log('User Logout Success');
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  if (loder) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={30} color={'#000'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData && (
        <View style={{alignItems: 'center', gap: 5}}>
          {/* <Text>
            id: <Text style={styles.title}>{userData.uid}</Text>
          </Text> */}
          <Text>
            <Text style={styles.title}>{userData.email}</Text>
          </Text>
          <Text>
            <Text style={styles.title}>{userData.displayName}</Text>
          </Text>
          {profileImage !== '' && (
            <Image
              source={{uri: profileImage}}
              style={{width: 100, height: 100, borderRadius: 50, marginTop: 10}}
            />
          )}
        </View>
      )}
      {!userData && (
        <TouchableOpacity onPress={facebookLogin} style={styles.button}>
          <Text style={styles.buttonText}>Facebook Login</Text>
        </TouchableOpacity>
      )}
      {userData && (
        <TouchableOpacity
          onPress={facebookLogout}
          style={[styles.button, {marginTop: 20}]}>
          <Text style={styles.buttonText}>Facebook Log Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    height: 55,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'blue',
    fontWeight: '500',
    fontSize: 15,
  },
});

export default FacebookLogin;

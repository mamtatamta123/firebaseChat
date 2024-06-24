import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';

import {
  GoogleSignin,
  statusCodes,
  Profile,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirebaseLogin from './fireStore/FirebaseLogin';

const Login = ({navigation}) => {
  const [loder, setLoader] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1011050127813-vte9igmk9ou0f80vu9d3d5bftmehiiv5.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    setLoader(true);
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      // setUserInfo(usrInfo);
      AsyncStorage.setItem('USER_DATA', JSON.stringify(usrInfo.user));
      navigation.replace('Home');
      setLoader(false);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        setLoader(false);
        console.log('1', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('2', error);
        setLoader(false);
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('3', error);
        setLoader(false);
        // play services not available or outdated
      } else {
        setLoader(false);
        // some other error happened
        console.log('4', error);
      }
    }
  };

  if (loder) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={'#000'} size={35} />
      </View>
    );
  }
  // facebook=========================================================================

  return (
    <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 15}}>
      <TouchableOpacity
      onPress={()=>navigation.navigate("FirebaseLogin")}
        style={{
          height: 70,
          width: 70,
          borderRadius: 40,
          backgroundColor: '#000',
          position: 'absolute',
          right: 15,
          top: '65%',
          justifyContent:'center',
          alignItems:'center',
          zIndex:9999
        }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Chat
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 30,
          marginTop: 30,
        }}>
        Login{' '}
      </Text>
      <LottieView
        source={require('../assetes/animation/googleLogin.json')}
        autoPlay
        loop
        style={{
          height: '60%',
          width: '90%',
          // backgroundColor: 'red',
          marginTop: '10%',
        }}
      />
      <View
        style={{
          gap: 10,
          width: '100%',
          marginTop: 'auto',
          marginBottom: '15%',
        }}>
        <TouchableOpacity
          onPress={signIn}
          style={{
            height: 55,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 6,
            elevation: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 15}}>
            Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('FacebookLogin')}
          style={{
            height: 55,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 6,
            elevation: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 15}}>
            Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  fbBtn: {
    backgroundColor: '#1399F130',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  btnTitle: {
    fontSize: 22,
    color: '#1399F1',
  },
});

// <TouchableOpacity
//           onPress={() =>
//             facebookLogin()
//               .then(res => {
//                 console.log(res);
//                 setUserData(res.user);
//               })
//               .catch(error => console.log(error))
//           }
//           style={styles.fbBtn}>
//           <Text style={styles.btnTitle}>Facebook Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={facebookLogout} style={styles.fbBtn}>
//           <Text style={styles.btnTitle}>Facebook Logout</Text>
//         </TouchableOpacity>

// =========================
// <View>
//   <LoginButton
//     onLoginFinished={(error, result) => {
//       if (error) {
//         console.log('Login has error: ' + result.error);
//       } else if (result.isCancelled) {
//         console.log('Login is cancelled.');
//       } else {
//         AccessToken.getCurrentAccessToken().then(data => {
//           console.log(data.accessToken.toString());

//           // Fetch current profile after successful login
//           Profile.getCurrentProfile().then(currentProfile => {
//             if (currentProfile) {
//               setProfileImage(currentProfile.imageUrl);
//               console.log(
//                 'The current logged user is: ' +
//                   currentProfile.name +
//                   '. His profile id is: ' +
//                   currentProfile.userID,
//               );
//             }
//           });
//         });
//       }
//     }}
//     onLogoutFinished={() => console.log('logout.')}
//     loginTrackingIOS={'limited'}
//     nonceIOS={'my_nonce'}
//   />

//   {profileImage !== '' && (
//     <Image
//       source={{uri: profileImage}}
//       style={{width: 100, height: 100, backgroundColor: 'red'}} // Example styles, adjust as needed
//     />
//   )}
// </View>;

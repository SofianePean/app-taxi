import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';

export const prefix = Platform.OS === "ios" ? "ios" : "md"

const config = {
    iosClientId: `94249926274-saguj6gplhdi6v8aau91cct5j5f7aoaf.apps.googleusercontent.com`,
    androidClientId: `94249926274-hi52o5rin4l952dpjlvg1f77l2m8jpt9.apps.googleusercontent.com`,
    iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
    androidStandaloneAppClientId: `94249926274-hi52o5rin4l952dpjlvg1f77l2m8jpt9.apps.googleusercontent.com`,
    redirectUrl: `${AppAuth.OAuthRedirect}:/oauthredirect`
};

  export const auth = async () => {
      try {
        const { type, accessToken, user } = await Google.logInAsync({
            iosClientId: `94249926274-saguj6gplhdi6v8aau91cct5j5f7aoaf.apps.googleusercontent.com`,
            androidClientId: `94249926274-hi52o5rin4l952dpjlvg1f77l2m8jpt9.apps.googleusercontent.com>`,
            iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
            androidStandaloneAppClientId: `<YOUR_ANDROID_CLIENT_ID>`,
          });
          if (type === 'success') {
            await AsyncStorage.setItem('user', JSON.stringify({
                name :user.name,
                photoUrl: user.photoUrl,
                email: user.email
            }));
            console.log('naviguer vers home');
          }  
      } catch (error) {
          console.log('ERROR', error)
      }

  }

  export const renderInitialScreen = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      console.log('USER GET', user)
      JSON.parse(user)
      return user ? "Home" : "Login"
    } catch (error) {
      console.log(error)
    }
  }


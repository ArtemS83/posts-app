import * as Font from 'expo-font';

export const loadApplicationFonts = async () => {
  await Font.loadAsync({
    NunitoRegular: require('../assets/fonts/Nunito-Regular.ttf'),
    NunitoBold: require('../assets/fonts/Nunito-Bold.ttf'),
  });
};

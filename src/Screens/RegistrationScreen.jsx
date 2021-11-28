import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  useWindowDimensions,
  Dimensions,
  Pressable,
} from 'react-native';
import { validateEmail } from '../hooks/validateEmail';
import Icon from 'react-native-vector-icons/FontAwesome5';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const screenHeight = Dimensions.get('screen').height;

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [heightBG, setHeightBG] = useState(screenHeight);
  const [hidePassword, setHidePassword] = useState(true);

  const { height, width } = useWindowDimensions();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const onChange = () => {
      setHeightBG(Dimensions.get('screen').height);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      subscription?.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      keyboardHide();
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);

  const OnSubmitForm = () => {
    if (
      state.name.trim().length === 0 ||
      state.email.trim().length === 0 ||
      state.password.trim().length === 0
    ) {
      Alert.alert('Attention!', 'Please, enter name,email or password!');
      return;
    }

    if (state.password.trim().length < 4) {
      Alert.alert('Alert', 'Password must be minimum 4 characters');
      return;
    }

    if (!validateEmail(state.email.trim())) {
      Alert.alert('Alert', 'Please enter a valid email');
      return;
    }

    keyboardHide();
    setState(initialState);
    console.log('OnSubmitForm', state); // TODO:
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={{ ...styles.imageBG, height: heightBG }}
        source={require('../assets/images/Photo_BG.png')}
      >
        <KeyboardAvoidingView
          // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          behavior={Platform.OS === 'ios' && 'padding'}
        >
          <View
            style={{
              ...styles.form,
              paddingHorizontal: width < height ? 20 : 100,
              marginBottom: isShowKeyboard ? -120 : width < height ? 0 : -120,
            }}
          >
            <Pressable
              style={styles.userImageContainer}
              onPressIn={() => console.log('Add user avatar')}
            >
              <Image
                style={styles.userImage}
                source={require('../assets/images/icon-avatar.png')}
                accessibilityLabel={'user avatar'}
              />
              <Icon
                style={styles.iconPlus}
                name={'plus'}
                size={30}
                color="#4169e1"
                onPress={() => console.log('Add user avatar+')}
              />
            </Pressable>
            <View
              style={{
                ...styles.header,
                marginVertical: width < height ? 32 : 14,
              }}
            >
              <Text style={styles.headerTitle}>Registration</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder={'User name'}
              keyboardType={'email-address'}
              onFocus={() => setIsShowKeyboard(true)}
              value={state.name}
              onChangeText={value =>
                setState(prevState => ({ ...prevState, name: value }))
              }
              disableFullscreenUI={true}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={{ ...styles.input, marginTop: 16 }}
              placeholder={'Email'}
              keyboardType={'email-address'}
              onFocus={() => setIsShowKeyboard(true)}
              value={state.email}
              onChangeText={value =>
                setState(prevState => ({ ...prevState, email: value }))
              }
              ref={emailRef}
              disableFullscreenUI={true}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={{ ...styles.input, ...styles.inputPassword }}
                placeholder={'Password'}
                secureTextEntry={hidePassword ? true : false}
                onFocus={() => setIsShowKeyboard(true)}
                value={state.password}
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, password: value }))
                }
                disableFullscreenUI={true}
                ref={passwordRef}
                onSubmitEditing={OnSubmitForm}
              />
              <Icon
                style={styles.iconPassword}
                name={hidePassword ? 'eye-slash' : 'eye'}
                size={22}
                color="#808080"
                onPress={() => setHidePassword(!hidePassword)}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={OnSubmitForm}
            >
              <Text style={styles.btnTitle}>SIGN UP</Text>
            </TouchableOpacity>
            <View
              style={{
                ...styles.redirectBox,
                marginTop: isShowKeyboard ? 30 : width < height ? '30%' : 30,
              }}
            >
              <Text style={styles.redirectText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  console.log('Redirect');
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.redirectLink}>Log in.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageBG: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    // paddingHorizontal: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: 'rgba(225, 225, 225, 0.55)',
  },
  userImageContainer: {
    position: 'absolute',
    bottom: '100%',
    borderRadius: 60,
    backgroundColor: 'rgba(225, 225, 225, 0.9)',
    zIndex: 1,
  },
  userImage: {
    flex: 1,
    width: 120,
    height: 120,
  },
  iconPlus: {
    position: 'absolute',
    right: 0,
    top: 75,
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 6,
    paddingBottom: 5,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'rgb(225, 225, 225)',
    zIndex: 2,
  },
  input: {
    width: '100%',
    paddingLeft: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#4169e1',
    height: 50,
    borderRadius: 25,
    color: '#212121',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
  },
  inputPassword: {
    flex: 1,
    marginTop: 16,
    paddingEnd: 54,
  },
  iconPassword: {
    position: 'absolute',
    top: '37%',
    right: '5%',
    padding: 5,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#212121',
  },

  btn: {
    borderRadius: 50,
    borderWidth: 1,
    width: '90%',
    height: 50,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        borderColor: '#f0f8ff',
      },
      android: {
        backgroundColor: '#4169e1',
        borderColor: 'transparent',
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === 'ios' ? '#4169e1' : '#f0f8ff',
    fontSize: 18,
  },

  redirectBox: {
    width: '120%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 2,
    borderColor: 'rgba(65, 105, 225,0.6)',
  },
  redirectText: {
    marginRight: 5,

    color: '#212121',
    fontSize: 16,
  },
  redirectLink: {
    color: '#1B4371',
    fontSize: 16,
    fontWeight: '700',
  },
});

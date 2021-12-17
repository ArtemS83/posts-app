import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressabl } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RegistrationScreen } from './Screens/auth/RegistrationScreen';
import { LoginScreen } from './Screens/auth/LoginScreen';
import Home from './Screens/main/Home';
import CommentsScreen from './Screens/main/CommentsScreen';
import ProfileScreen from './Screens/main/ProfileScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: { height: 60 },
        headerStyle: {
          height: 80, // Specify the height of your custom header
        },
      }}
    >
      <MainTab.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation, route }) => ({
          tabBarStyle: {
            display: 'none',
          },
          headerTitleAlign: 'center',
          // headerShown: false, //hidden header screen
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              color="black"
              size={26}
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
          // tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        })}
      />
      <MainTab.Screen
        name="Home"
        component={Home}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            if (navigation.getState().index === 1) {
              console.log(
                '🚀 ~ file: router.js ~ listeners-CREATE new post',
                navigation.getState().index,
              );
            }
          },
        })}
        options={({ navigation, route }) => ({
          title: 'Posts',
          headerTitleAlign: 'center',
          headerStyle: {
            // backgroundColor: 'red',
          },
          headerTitleStyle: {
            // fontSize: 30,
          },
          // headerShown: false, //hidden header screen
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={28}
              color="#BDBDBD"
              style={{ marginRight: 20 }}
              onPress={() => {
                console.log('🚀 ~ file: router.js ~ logout');
              }}
            />
          ),
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            const focus = focused;
            return (
              <AntDesign
                name="plus"
                size={size}
                color={color}
                style={focused ? styles.iconPlusFocused : styles.iconPlus}
              />
            );
          },
        })}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          // navigation.state.index:1,
          headerShown: false, //hidden header screen
          tabBarShowLabel: false,

          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              size={size}
              color={color}
              style={focused && styles.iconUserFocused}
            />
          ),
        })}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconPlusFocused: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'blue',
    borderRadius: 25,
    color: '#fff',
    position: 'absolute',
    zIndex: 100,
  },
  iconPlus: {
    // position: 'absolute',
    // right: -75,
  },
  iconUserFocused: {
    // position: 'absolute',
    // right: 135,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'blue',
    borderRadius: 25,
    color: '#fff',
  },
});

export default useRoute;

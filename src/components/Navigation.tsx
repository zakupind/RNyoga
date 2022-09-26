import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import {
  Profile,
  Meditations,
  SignIn,
  SignUp,
  ForgotPassword,
  About,
  Rules,
  Pays,
} from '../screens';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import { Policy } from '../screens/Policy';
import { EditPassword } from '../screens/EditPassword';
import { Meditation } from '../screens/Meditation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { getUserRequest } from '../api/login';
import { setUser } from '../store/slices/user';
import { getRefreshToken } from 'react-native-axios-jwt';

type RootStackParameterList = {
  MeditationsStack: undefined;
  Settings: undefined;
};
export type Props = BottomTabScreenProps<RootStackParameterList>;

const SettingsStack = createStackNavigator();
const MeditationsStack = createStackNavigator();

const SettingsStackScreens = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      <SettingsStack.Screen
        name="Policy"
        options={{ headerShown: false }}
        component={Policy}
      />
      <SettingsStack.Screen
        name="EditPassword"
        options={{ headerShown: false }}
        component={EditPassword}
      />
      <SettingsStack.Screen
        name="About"
        options={{ headerShown: false }}
        component={About}
      />
      <SettingsStack.Screen
        name="Rules"
        options={{ headerShown: false }}
        component={Rules}
      />
      <SettingsStack.Screen
        name="Pays"
        options={{ headerShown: false }}
        component={Pays}
      />
    </SettingsStack.Navigator>
  );
};

const MeditationsStackScreens = () => {
  return (
    <MeditationsStack.Navigator>
      <MeditationsStack.Screen
        name="Meditations"
        options={{ headerShown: false }}
        component={Meditations}
      />
      <MeditationsStack.Screen
        name="Meditation"
        options={{ headerShown: false }}
        component={Meditation}
      />
      <MeditationsStack.Screen
        name="Pays"
        options={{ headerShown: false }}
        component={Pays}
      />
    </MeditationsStack.Navigator>
  );
};

enableScreens(); //New line added

export const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.user);

  const SignedIn = createBottomTabNavigator();
  const SignedOut = createStackNavigator();

  const getUser = async () => {
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      const res = await getUserRequest();

      if (res && res.data && res.data.email) {
        dispatch(setUser(res.data));
      }
    }
  };

  useEffect(() => {
    void getUser();
  }, []);

  if (isAuth) {
    return (
      <NavigationContainer>
        <SignedIn.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { backgroundColor: '#2E2E2E' },
            tabBarIcon: ({ color }) => {
              let icon;
              let widthIcon: number = 25;
              let heightIcon: number = 25;

              if (route.name === 'MeditationsStack') {
                icon = require('../assets/icons/meditation.png');
              } else if (route.name === 'Settings') {
                icon = require('../assets/icons/settings.png');
              }
              return (
                <Image
                  source={icon}
                  style={{
                    tintColor: color,
                    width: widthIcon,
                    height: heightIcon,
                  }}
                />
              );
            },
            tabBarActiveTintColor: '#D25800',
          })}>
          <SignedIn.Screen
            name="MeditationsStack"
            options={{ title: 'Медитации' }}
            component={MeditationsStackScreens}
          />
          <SignedIn.Screen
            name="Settings"
            options={{ title: 'Настройки' }}
            component={SettingsStackScreens}
          />
        </SignedIn.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <SignedOut.Navigator initialRouteName="SignIn">
          <SignedOut.Screen
            options={{ headerShown: false }}
            name="SignIn"
            component={SignIn}
          />
          <SignedOut.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUp}
          />
          <SignedOut.Screen
            options={{ headerShown: false }}
            name="ForgotPassword"
            component={ForgotPassword}
          />
        </SignedOut.Navigator>
      </NavigationContainer>
    );
  }
};

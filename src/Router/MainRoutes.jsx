import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import MatchesScreen from '../screens/MatchesScreen/MatchesScreen';
import MoreScreen from '../screens/MoreScreen/MoreScreen';
import screenNames from '../helpers/ScreenNames/ScreenNames';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import BottomTabNavigations from './BottomTabNavigations/BottomTabNavigations';
import NewsScreen from '../screens/NewsScreen/NewsScreen';
import NewsDetailsScreen from '../screens/NewsScreen/NewsDetailsScreen';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen/SubscriptionScreen';
import ServiceProviderDetailsScreen from '../screens/ServiceProviderScreen/ServiceProviderDetailsScreen';
import ServiceProviderScreen from '../screens/ServiceProviderScreen/ServiceProviderScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen/UpdateProfileScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen/UserDetailsScreen';
import AboutusScreen from '../screens/AboutusScreen/AboutusScreen';
import ContactScreen from '../screens/ContactusScreen/ContactusScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen/PaymentHistoryScreen';
import useAuthStorage from '../helpers/Hooks/useAuthStorage';
import ShortlistedScreen from '../screens/ShortlistedScreen/ShortlistedScreen';
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen';
import ChatsDetailsScreen from '../screens/ChatsScreen/ChatsDetailsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ForgotPasswordScreen/ResetPasswordScreen';
import VideoCallScreen from '../screens/ChatsScreen/VideoCallScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <Tab.Navigator tabBar={(props) => <BottomTabNavigations props={props} />}
        screenOptions={{
            headerShown: false,
        }}>
        <Tab.Screen name={screenNames.HomeScreen} component={HomeScreen} />
        <Tab.Screen name={screenNames.SearchScreen} component={SearchScreen} />
        <Tab.Screen name={screenNames.MatchesScreen} component={MatchesScreen} />
        <Tab.Screen name={screenNames.MoreScreen} component={MoreScreen} />
    </Tab.Navigator>
);

const Stack = createNativeStackNavigator();

const MainRoutes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const { loginData } = useAuthStorage();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (!loginData?.accessToken) {
          setShowOnboarding(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }, [loginData]);
  
    if (isLoading) return <SplashScreen />;
  

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* When not logged in */}
        {!loginData?.accessToken ? (
          <>
            {showOnboarding && (
              <Stack.Screen name={screenNames.OnboardingScreen}>
                {(props) => (
                  <OnboardingScreen
                    {...props}
                    onFinish={() => setShowOnboarding(false)}
                  />
                )}
              </Stack.Screen>
            )}
            <Stack.Screen name={screenNames.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={screenNames.SignUpScreen} component={SignupScreen} />
            <Stack.Screen name={screenNames.ForgotPassword} component={ForgotPasswordScreen} />
            <Stack.Screen name={screenNames.ResetPassword} component={ResetPasswordScreen} />
          </>
        ) : (
                    <>
                    <Stack.Screen name={screenNames.MainTabs}>
              {(props) => <MainTabs {...props} loginData={loginData} />}
            </Stack.Screen>
                        <Stack.Screen name={screenNames.OnboardingScreen} component={OnboardingScreen} />
                        <Stack.Screen name={screenNames.LoginScreen} component={LoginScreen} />

                        <Stack.Screen name={screenNames.SignUpScreen} component={SignupScreen} />
                        <Stack.Screen name={screenNames.NewsScreen} component={NewsScreen} />
                        <Stack.Screen name={screenNames.NewsDetailsScreen} component={NewsDetailsScreen} />
                        <Stack.Screen
                            name={screenNames.DetailsScreen}
                            component={UserDetailsScreen}
                        />
                        <Stack.Screen
                            name={screenNames.UpdateProfileScreen}
                            component={UpdateProfileScreen}
                        />

                        <Stack.Screen
                            name={screenNames.ServieProviderScreen}
                            component={ServiceProviderScreen}
                        />
                        <Stack.Screen
                            name={screenNames.ServieProviderDetailsScreen}
                            component={ServiceProviderDetailsScreen}
                        />
                        <Stack.Screen
                            name={screenNames.SubscriptionScreen}
                            component={SubscriptionScreen}
                        />
                        <Stack.Screen
                            name={screenNames.NotificationScreen}
                            component={NotificationScreen}
                        />

                        <Stack.Screen
                            name={screenNames.AboutusScreen}
                            component={AboutusScreen}
                        />
                        <Stack.Screen
                            name={screenNames.ContactScreen}
                            component={ContactScreen}
                        />

                        <Stack.Screen
                            name={screenNames.ShortlistedScreen}
                            component={ShortlistedScreen}
                        />

                        <Stack.Screen
                            name={screenNames.ChatsScreen}
                            component={ChatsScreen}
                        />
                        <Stack.Screen
                            name={screenNames.ChatsDetailsScreen}
                            component={ChatsDetailsScreen}
                        />
                        <Stack.Screen name={screenNames.PaymentHistoryScreen} component={PaymentHistoryScreen} />
                        <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />



                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainRoutes;

const styles = StyleSheet.create({
    center: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    text: {
        fontSize: 24,
    },
});

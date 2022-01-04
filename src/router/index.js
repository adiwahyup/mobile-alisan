import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  ProductScreen,
  ProfileScreen,
  ProductDetail,
  Cart,
  Checkout,
  EditProfile,
  ChangePassword,
  History,
  Login,
  Register,
  Payment,
  Order,
} from '../pages';
import { BottomNavigator } from '../components';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{ title: 'Explore', headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{ title: 'Order History' }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ title: 'Your Order' }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: 'Continue Payment', animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;

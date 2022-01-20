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
  History,
  Login,
  Register,
  Payment,
  Order,
  YourOrder,
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
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ title: 'Cart' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: 'Edit Profile' }}
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
        options={{ title: 'Checkout' }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ title: 'Payment' }}
      />
      <Stack.Screen
        name="YourOrder"
        component={YourOrder}
        options={{ title: 'Your Order' }}
      />
    </Stack.Navigator>
  );
};

export default Router;

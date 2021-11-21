import React from 'react';
import {
  IconEditProfile,
  IconChangePassword,
  IconSignOut,
  IconHistory,
} from '../assets/assetsRouter';

export const dummyMenu = [
  {
    id: 1,
    nama: 'Edit Profile',
    gambar: <IconEditProfile />,
    page: 'EditProfile',
  },
  {
    id: 2,
    nama: 'Change Password',
    gambar: <IconChangePassword />,
    page: 'ChangePassword',
  },
  {
    id: 3,
    nama: 'Order History',
    gambar: <IconHistory />,
    page: 'History',
  },
  {
    id: 4,
    nama: 'Sign Out',
    gambar: <IconSignOut />,
    page: 'Login',
  },
];

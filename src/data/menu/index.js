import React from 'react';
import { IconEditProfile, IconSignOut, IconHistory } from '../../assets';

export const menu = [
  {
    id: 1,
    nama: 'Edit Profile',
    gambar: <IconEditProfile />,
    page: 'EditProfile',
  },
  {
    id: 3,
    nama: 'Order History',
    gambar: <IconHistory />,
    page: 'History',
  },
  {
    id: 4,
    nama: 'Logout',
    gambar: <IconSignOut />,
    page: 'MainApp',
  },
];

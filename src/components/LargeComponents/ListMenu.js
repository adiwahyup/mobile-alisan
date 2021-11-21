import React from 'react';
import { View } from 'react-native';
import { CardMenu } from '../SmallComponents/SmallComponentRouter';

const ListMenu = ({ menus, navigation }) => {
  return (
    <View>
      {menus.map(menu => {
        return <CardMenu menu={menu} key={menu.id} navigation={navigation} />;
      })}
    </View>
  );
};

export default ListMenu;

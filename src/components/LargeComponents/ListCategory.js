import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardCategory } from '../SmallComponents/SmallComponentRouter';

const listCategory = ({ categories }) => {
  return (
    <View style={styles.container}>
      {categories.map(category => {
        return <CardCategory category={category} key={category.id} />;
      })}
    </View>
  );
};

export default listCategory;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

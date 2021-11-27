import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CardShirt } from '../../SmallComponents';

const ListShirt = ({ shirts, navigation }) => {
  return (
    <View style={styles.container}>
      {shirts.map(shirt => {
        return (
          <CardShirt key={shirt.id} shirt={shirt} navigation={navigation} />
        );
      })}
    </View>
  );
};

export default ListShirt;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
});

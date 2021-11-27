import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CardCart } from '../../SmallComponents';

const ListCart = ({ carts }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {carts.map(cart => {
          return <CardCart cart={cart} key={cart.id} />;
        })}
      </View>
    </ScrollView>
  );
};

export default ListCart;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

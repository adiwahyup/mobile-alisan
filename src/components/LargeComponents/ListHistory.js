import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CardHistory } from '../SmallComponents/SmallComponentRouter';

const ListHistory = ({ orders }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {orders.map(order => {
          return <CardHistory order={order} key={order.id} />;
        })}
      </View>
    </ScrollView>
  );
};

export default ListHistory;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
});

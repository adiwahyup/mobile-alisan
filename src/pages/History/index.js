import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListHistory } from '../../components';
import { dummyOrder } from '../../data';
import { colors } from '../../utils';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: dummyOrder,
    };
  }

  render() {
    const { orders } = this.state;
    return (
      <View style={styles.pages}>
        <ListHistory orders={orders} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

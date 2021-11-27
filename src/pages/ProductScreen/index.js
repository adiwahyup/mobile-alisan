import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { HeaderComponent, ListShirt, Distance } from '../../components';
import { colors, fonts } from '../../utils';
import { dummyCategory, dummyShirt } from '../../data';

export default class ProductScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: dummyCategory,
      shirts: dummyShirt,
    };
  }

  render() {
    const { shirts } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.shirt}>
            <Text style={styles.label}>
              Pilih <Text style={styles.boldLabel}>Kemeja</Text> Favoritmu
            </Text>
            <ListShirt shirts={shirts} navigation={navigation} />
          </View>

          <Distance height={50} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  shirt: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.semibold,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});

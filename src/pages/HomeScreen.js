import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  Button,
  HeaderComponent,
  ListCategory,
  ListShirt,
  Distance,
} from '../components/ComponentRouter';
import { colors, fonts } from '../utils/UtilsRouter';
import { dummyCategory, dummyShirt } from '../data/dummyRouter';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: dummyCategory,
      shirts: dummyShirt,
    };
  }

  render() {
    const { categories, shirts } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderComponent navigation={navigation} />
          <View style={styles.category}>
            <Text style={styles.label}>Pilih Kategori</Text>
            <ListCategory categories={categories} />
          </View>
          <View style={styles.shirt}>
            <Text style={styles.label}>
              Pilih <Text style={styles.boldLabel}>Kemeja</Text> Favoritmu
            </Text>
            <ListShirt shirts={shirts} navigation={navigation} />

            <Button title="Lihat Semua" type="text" padding={7} />
          </View>
          <Distance height={50} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  category: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  shirt: {
    marginHorizontal: 30,
    marginTop: 25,
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

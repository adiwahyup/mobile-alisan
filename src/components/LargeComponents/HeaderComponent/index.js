import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { colors, fonts, responsiveHeight } from '../../../utils';
import { IconCari } from '../../../assets';
import { Distance, Button } from '../../SmallComponents';

export default class HeaderComponent extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          {/* Input Pencarian */}
          <View style={styles.searchSection}>
            <IconCari />
            <TextInput placeholder="Cari Produk.." style={styles.input} />
          </View>
          <Distance width={10} />
          <Button
            icon="keranjang"
            // totalKeranjang={2}
            padding={10}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(120),
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    fontSize: 16,
    fontFamily: fonts.primary.reguler,
  },
  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 35,
    flexDirection: 'row',
  },
});

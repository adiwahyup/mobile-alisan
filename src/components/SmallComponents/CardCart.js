import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { IconHapus } from '../../assets/assetsRouter';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  numberWithCommas,
} from '../../utils/UtilsRouter';
import Distance from './Distance';

const CardCart = ({ cart }) => {
  return (
    <View style={styles.container}>
      <Image source={cart.product.gambar[0]} style={styles.gambar} />
      <View style={styles.desc}>
        <Text style={styles.nama}>{cart.product.nama}</Text>
        <Text style={styles.text}>
          Rp {numberWithCommas(cart.product.harga)}
        </Text>
        <Distance height={responsiveHeight(14)} />

        <Text style={styles.textBold}>Jumlah: {cart.jumlahPesan}</Text>
        <Text style={styles.textBold}>Ukuran: {cart.ukuran}</Text>
        <Text style={styles.textBold}>
          Total Harga: {numberWithCommas(cart.totalHarga)}
        </Text>
        <Text style={styles.textBold}>Catatan:</Text>
        <Text style={styles.textBold}>{cart.catatan}</Text>
      </View>
      <View style={styles.hapus}>
        <IconHapus />
      </View>
    </View>
  );
};

export default CardCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  gambar: {
    width: responsiveWidth(88),
    height: responsiveHeight(135),
    // resizeMode: 'contain',
  },
  hapus: {
    flex: 1,
    alignItems: 'flex-end',
  },
  nama: {
    fontFamily: fonts.primary.bold,
    fontSize: 15,
  },
  text: {
    fontFamily: fonts.primary.reguler,
    fontSize: 11,
  },
  textBold: {
    fontFamily: fonts.primary.bold,
    fontSize: 11,
  },
});

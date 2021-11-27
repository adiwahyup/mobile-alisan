import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  numberWithCommas,
  fonts,
} from '../../../utils';
import Distance from '../Distance';

const CardHistory = ({ order }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{order.date}</Text>
      {order.orders.map((history, index) => {
        return (
          <View key={index} style={styles.history}>
            <Text style={styles.textBold}>{index + 1}. </Text>
            <Image source={history.product.gambar[0]} style={styles.shirt} />
            <View style={styles.desc}>
              <Text style={styles.nama}>{history.product.nama}</Text>
              <Text style={styles.harga}>
                Rp {numberWithCommas(history.product.harga)}
              </Text>

              <Distance height={10} />

              <Text style={styles.textBold}>
                Jumlah : {history.jumlahPesan}
              </Text>
              <Text style={styles.textBold}>
                Total Harga : {numberWithCommas(history.totalHarga)}
              </Text>
            </View>
          </View>
        );
      })}

      <Distance height={10} />
      <View style={styles.footer}>
        <View style={styles.label}>
          <Text style={styles.textBlue}>Status :</Text>
          <Text style={styles.textBlue}>Ongkir (2-3 Hari) :</Text>
          <Text style={styles.textBlue}>Total Harga :</Text>
        </View>

        <View style={styles.label}>
          <Text style={styles.textBlue}>{order.status}</Text>
          <Text style={styles.textBlue}>Rp 15.000</Text>
          <Text style={styles.textBlue}>
            Rp {numberWithCommas(order.totalHarga + 15000)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  history: {
    flexDirection: 'row',
    marginTop: 10,
  },
  shirt: {
    width: responsiveWidth(66),
    height: responsiveHeight(66),
  },
  date: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  textBold: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
  },
  desc: {
    marginLeft: responsiveWidth(7),
  },
  nama: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
  },
  harga: {
    fontSize: 12,
    fontFamily: fonts.primary.reguler,
  },
  footer: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
  },
  textBlue: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
});

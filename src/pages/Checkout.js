import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
  CardAddress,
  Option,
  Distance,
  Button,
} from '../components/SmallComponents/SmallComponentRouter';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
} from '../utils/UtilsRouter';
import { dummyProfile, dummyOrder } from '../data/dummyRouter';

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: dummyProfile,
      order: dummyOrder[0],
      ekspedisi: [],
    };
  }
  render() {
    const { profile, order, ekspedisi } = this.state;
    return (
      <View style={styles.pages}>
        <View style={styles.isi}>
          <Text style={styles.textBold}>
            Apakah alamat dibawah ini sudah sesuai?
          </Text>
          <CardAddress profile={profile} />
          <View style={styles.total}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(order.totalHarga)}
            </Text>
          </View>

          <Option label="Pilih Ekspedisi" datas={ekspedisi} />
          <Distance height={50} />

          <Text style={styles.textBold}>Biaya Ongkir :</Text>

          <View style={styles.ongkir}>
            <Text style={styles.text}>Berat Produk : {order.berat} kg </Text>
            <Text style={styles.textBold}>Rp {numberWithCommas(15000)}</Text>
          </View>

          <View style={styles.ongkir}>
            <Text style={styles.text}>Estimasi Waktu :</Text>
            <Text style={styles.textBold}>2-3 Hari</Text>
          </View>
        </View>

        <Distance height={responsiveHeight(40)} />
        <View style={styles.footer}>
          {/* Total Harga */}
          <View style={styles.total}>
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp {numberWithCommas(order.totalHarga + 15000)}
            </Text>
          </View>

          {/* Tombol */}
          <Button
            title="Bayar"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            onPress={() => this.props.navigation.navigate('Checkout')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
  },
  isi: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontSize: 17,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: 17,
    fontFamily: fonts.primary.reguler,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  ongkir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 30,
  },
});

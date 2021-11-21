import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ShirtSlider } from '../components/LargeComponents/LargeComponentRouter';
import {
  Button,
  Input,
  Option,
  Distance,
} from '../components/SmallComponents/SmallComponentRouter';
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  fonts,
  heightMobileUI,
  numberWithCommas,
} from '../utils/UtilsRouter';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shirt: this.props.route.params.shirt,
      images: this.props.route.params.shirt.gambar,
    };
  }

  render() {
    const { navigation } = this.props;
    const { shirt, images } = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.button}>
          <Button
            icon="arrow-left"
            padding={7}
            onPress={() => navigation.goBack()}
          />
        </View>
        <ShirtSlider images={images} />
        <View style={styles.container}>
          <View style={styles.desc}>
            <Text style={styles.nama}>{shirt.nama}</Text>
            <Text style={styles.harga}>
              Harga: Rp {numberWithCommas(shirt.harga)}
            </Text>
            <View style={styles.garis} />
            <View style={styles.wrapJenisBerat}>
              <Text style={styles.jenisBerat}>Jenis: {shirt.jenis}</Text>
              <Text style={styles.jenisBerat}>Berat: {shirt.berat}</Text>
            </View>
            <View style={styles.wrapInput}>
              <Input
                label="Jumlah"
                width={responsiveWidth(166)}
                height={responsiveHeight(35)}
                fontSize={13}
              />
              <Option
                label="Pilih Ukuran"
                width={responsiveWidth(166)}
                height={responsiveHeight(35)}
                fontSize={13}
                datas={shirt.ukuran}
              />
            </View>
            <Input
              label="Catatan"
              textarea
              fontSize={13}
              placeholder="Tambahkan catatan..."
            />
            <Distance height={15} />
            <Button
              title="Masukkan Keranjang"
              type="textIcon"
              icon="keranjang-putih"
              padding={responsiveHeight(17)}
              fontSize={18}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(460),
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  button: {
    position: 'absolute',
    marginTop: 20,
    marginLeft: 30,
    zIndex: 1,
  },
  desc: {
    marginHorizontal: 30,
  },
  nama: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginTop: 20,
  },
  harga: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.light,
    marginTop: 10,
  },
  garis: {
    borderWidth: 0.3,
    marginVertical: 5,
  },
  wrapJenisBerat: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  jenisBerat: {
    fontSize: 13,
    fontFamily: fonts.primary.reguler,
    marginRight: 30,
  },
  wrapInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

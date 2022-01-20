import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  numberFormat,
  fonts,
  dateFormat,
  discount,
  heightMobileUI,
  dateStrip,
} from '../../../utils';
import Distance from '../Distance';
class CardYourOrder extends Component {
  componentDidMount() {}

  render() {
    const { yourorder, orderdetail } = this.props;
    console.log('test orderdetail', orderdetail);

    const date = dateStrip(yourorder.order_purchase);

    return (
      <View style={styles.page}>
        <Text style={styles.name}>Dipesan oleh: {yourorder.name}</Text>
        <View style={styles.orderDetail}>
          <Text style={styles.textBold}>Pembelian</Text>
          <View style={styles.line} />
          <Text style={styles.text}>{date}</Text>
          <Text style={styles.text}>{yourorder.number}</Text>
          <Text style={styles.text}>
            Rp. {numberFormat(yourorder.order_total)}
          </Text>
        </View>

        <View style={styles.orderDetail}>
          <Text style={styles.textBold}>Pengguna</Text>
          <View style={styles.line} />
          <Text style={styles.text}>{yourorder.name}</Text>
          <Text style={styles.text}>{yourorder.email}</Text>
          <Text style={styles.text}>{yourorder.address}</Text>
        </View>

        <View style={styles.orderDetail}>
          <Text style={styles.textBold}>Pengiriman</Text>
          <View style={styles.line} />
          <Text style={styles.textKurir}>{yourorder.order_expedition}</Text>
          <Text style={styles.text}>
            Rp. {numberFormat(yourorder.order_shipping_cost)}
          </Text>
          <Text style={styles.text}>{yourorder.order_address}</Text>
        </View>

        <View style={styles.line} />
        <View>
          <Text style={styles.name}>Detail Produk</Text>
        </View>
        <View style={styles.line} />
        <ScrollView style={styles.fill}>
          {Object.keys(orderdetail).map((key, index) => {
            const imgSplit = orderdetail[key].product_picture.split(', ')[0];
            const img =
              imgSplit === 'id1-back.jpg'
                ? require('../../../assets/product/id1-back.jpg')
                : 'id2-back.jpg'
                ? require('../../../assets/product/id2-back.jpg')
                : null;

            return (
              <View key={index} style={styles.orderDetail}>
                <View style={styles.desc}>
                  <View style={styles.wrapImage}>
                    <Image style={styles.image} source={img} />
                  </View>
                  <Text style={styles.textHeader}>
                    {orderdetail[key].product_name}
                  </Text>
                </View>
                <View style={styles.line} />
                <View style={styles.footerCard}>
                  <View style={styles.label}>
                    <Text style={styles.textBlueLeft}>Harga: </Text>
                    <Text style={styles.textBlueLeft}>Jumlah :</Text>
                    <Text style={styles.textBlueLeft}>Subtotal :</Text>
                  </View>

                  <View style={styles.label}>
                    <Text style={styles.textBlueRight}>
                      Rp.{' '}
                      {numberFormat(
                        discount(
                          orderdetail[key].product_price,
                          orderdetail[key].product_discount,
                        ),
                      )}
                    </Text>
                    <Text style={styles.textBlueRight}>
                      {orderdetail[key].order_detail_amount} Pcs
                    </Text>
                    <Text style={styles.textBlueRight}>
                      Rp. {numberFormat(orderdetail[key].order_detail_subharga)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // updateStatusLoading: state.HistoryReducer.updateStatusLoading,
});

export default connect(mapStateToProps, null)(CardYourOrder);

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
  },
  fill: {
    backgroundColor: colors.white,
  },
  textHeader: {
    fontSize: 17,
    fontFamily: fonts.primary.bold,
  },
  orderDetail: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 8,
    padding: 8,
    borderRadius: 25,
    marginHorizontal: 5,
    marginBottom: responsiveHeight(10),
    marginTop: 10,
  },
  wrapImage: {
    alignItems: 'center',
    height: responsiveHeight(155),
  },
  label: {
    flex: 1,
  },
  image: {
    width: responsiveWidth(140),
    height: responsiveHeight(155),
  },
  footerCard: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    color: colors.black,
    textTransform: 'uppercase',
  },
  textBold: {
    fontSize: 17,
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  textKurir: {
    fontSize: 17,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
  },
  textBlueRight: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textAlign: 'right',
  },
  textBlueLeft: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  line: {
    borderWidth: 0.2,
    marginVertical: 4,
  },

  price: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  itemPrice: {
    textAlign: 'center',
    fontSize: RFValue(18, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginRight: 5,
    color: colors.primary,
  },
});

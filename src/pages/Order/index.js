import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { Button, Distance } from '../../components';
import {
  responsiveHeight,
  responsiveWidth,
  fonts,
  colors,
  numberFormat,
  heightMobileUI,
  discount,
} from '../../utils';

export class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_name: this.props.route.params.product_name,
      product_price: this.props.route.params.product_price,
      product_size: this.props.route.params.product_size,
      product_picture: this.props.route.params.product_picture,
      shippingCost: this.props.route.params.shippingCost,
      totalPrice: this.props.route.params.subTotal,
      totalWeight: this.props.route.params.totalWeight,
      productCart: this.props.route.params.cart,
    };
  }

  Payment = () => {
    const { postOrderResult } = this.props;
    const params = {
      order_id: postOrderResult.orderid.order_id,
      user_id: postOrderResult.orderid.user_id,
      redirect_url: postOrderResult.snaptoken.redirect_url,
      token: postOrderResult.snaptoken.token,
    };
    this.props.navigation.navigate('Payment', params);
  };

  render() {
    const { shippingCost, productCart, totalPrice } = this.state;

    const { postOrderLoading } = this.props;

    return (
      <View style={styles.page}>
        <View style={styles.wrapLine}>
          <View style={styles.line} />
        </View>
        <Text style={styles.title}>Review your order</Text>
        <View styles={styles.review}>
          <View style={styles.wrapLine}>
            <View style={styles.line} />
          </View>
        </View>
        <ScrollView style={styles.fill}>
          {Object.keys(productCart).map((key, index) => {
            const imgSplit = productCart[key].product_picture.split(', ')[0];

            const img =
              imgSplit === 'id1-back.jpg'
                ? require('../../assets/product/id1-back.jpg')
                : require('../../assets/product/id2-back.jpg');

            return (
              <View key={index} style={styles.cardProduct}>
                <Text style={styles.text}>{index + 1}.</Text>
                <View style={styles.desc}>
                  <View style={styles.imagev}>
                    <Image style={styles.image} source={img} />
                  </View>
                  <Text style={styles.name}>
                    {productCart[key].product_name}
                  </Text>
                  <View styel={styles.price}>
                    <Text style={styles.itemPrice}>
                      Rp.{' '}
                      {numberFormat(
                        discount(
                          productCart[key].product_price,
                          productCart[key].product_discount,
                        ),
                      )}
                    </Text>
                  </View>
                </View>
                <Distance height={5} />

                <View style={styles.line} />

                <Distance height={10} />
                <View style={styles.footerCard}>
                  <View style={styles.label}>
                    <Text style={styles.textBlueLeft}>Quantity:</Text>
                    {/* <Text style={styles.textBlueLeft}>Shipping Cost:</Text> */}
                    <Text style={styles.textBlueLeft}>Subtotal :</Text>
                  </View>

                  <View style={styles.label}>
                    <Text style={styles.textBlueRight}>
                      {productCart[key].qty} Pcs
                    </Text>

                    <Text style={styles.textBlueRight}>
                      Rp.{' '}
                      {numberFormat(
                        discount(
                          productCart[key].product_price,
                          productCart[key].product_discount,
                        ) * productCart[key].qty,
                      )}
                    </Text>
                  </View>
                </View>

                <Distance height={responsiveHeight(10)} />
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.shipping}>
            <Text style={styles.text}>Shipping Cost : </Text>
            <Text style={styles.text}>Rp. {numberFormat(shippingCost)}</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.textBold}>Total Price : </Text>
            <Text style={styles.textBold}>
              Rp
              {totalPrice ? numberFormat(totalPrice + shippingCost) : 0}
            </Text>
          </View>

          <Button
            title="Proceed to Payment"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            disable={true}
            onPress={() => this.Payment()}
            loading={postOrderLoading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  postOrderLoading: state.OrderReducer.updateOrderLoading,
  postOrderResult: state.OrderReducer.postOrderResult,
});
export default connect(mapStateToProps, null)(Order);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fill: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  image: {
    width: responsiveWidth(140),
    height: responsiveHeight(155),
  },
  imagev: {
    alignItems: 'center',
    height: responsiveHeight(155),
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(10),
  },
  cardProduct: {
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
    marginBottom: responsiveHeight(15),
    marginTop: 15,
  },
  line: {
    borderWidth: 0.2,
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  desc: {
    marginHorizontal: 30,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
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
  footerCard: {
    flexDirection: 'row',
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
    elevation: 15,
    paddingBottom: 25,
    // paddingTop: 10,
  },
  label: {
    flex: 1,
  },
  textBlueRight: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textAlign: 'right',
  },
  textBlueLeft: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    paddingBottom: 5,
  },
  shipping: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

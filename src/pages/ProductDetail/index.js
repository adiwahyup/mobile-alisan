import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  fonts,
  heightMobileUI,
  numberFormat,
  getData,
  discount,
} from '../../utils';
import { ProductSlider, Button, Size, Distance } from '../../components';
import { addCart } from '../../actions/CartAction';
import { getDetailProduct } from '../../actions/ProductAction';
import { connect } from 'react-redux';
import InputAmount from '../../components/SmallComponents/InputAmount';

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: this.props.route.params.product,
      images: this.props.route.params.product_dummy.image,
      dummSize: this.props.route.params.product_dummy.size,
      size: false,
      selectedSize: '',
      product_size: '',
      product_price: '',
      product_picture: '',
      qty: '',
      ssp_id: '',
    };
  }
  componentDidMount() {
    this.props.dispatch(
      getDetailProduct(this.props.route.params.product.product_slug),
    );
  }

  componentDidUpdate(prevProps) {
    const { addCartResult, getSspResult } = this.props;

    if (addCartResult && prevProps.addCartResult !== addCartResult) {
      Alert.alert('Success', 'Product has been added to cart');
      this.props.navigation.navigate('Home');
    }
    if (getSspResult && prevProps.getSspResult !== getSspResult) {
      this.sspResult(getSspResult);
    }
  }

  sspResult = getSspResult => {
    this.setState({
      size: getSspResult,
    });
  };

  toCart = () => {
    const { qty, product_size, product } = this.state;
    getData('user').then(res => {
      if (res) {
        this.setState({
          id: res.uid,
          product_price: product.product_price,
          product_picture: product.product_picture.split(', ')[0],
        });

        if (qty < 1) {
          Alert.alert('Info', 'Minimum Beli 1');
        } else if (qty && product_size) {
          this.props.dispatch(addCart(this.state));
        } else {
          Alert.alert('Error', 'Isi semua detail');
        }
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  };

  selectedSize = product_size => {
    if (product_size) {
      this.setState({
        selectedsize: product_size,
        product_size: product_size.ssp_size,
        ssp_id: product_size.ssp_id,
      });
    }
  };
  render() {
    const { navigation, addCartLoading } = this.props;
    const { product, images, qty, size, selectedsize } = this.state;

    return (
      <View style={styles.page}>
        <View style={styles.button}>
          <Button
            icon="arrow-left"
            padding={7}
            onPress={() => navigation.goBack()}
          />
        </View>
        <ProductSlider images={images} />
        <View style={styles.container}>
          <View style={styles.desc}>
            <Text style={styles.name}>{product.product_name}</Text>
            <View style={styles.price}>
              <Text style={styles.newPrice}>
                Rp.{' '}
                {numberFormat(
                  discount(product.product_price, product.product_discount),
                )}
              </Text>
              <Text style={styles.discount}>
                Rp. {numberFormat(product.product_price)}
              </Text>
            </View>
            <View style={styles.line} />
            <View style={styles.wrapInput}>
              <InputAmount
                label="Jumlah"
                width={responsiveWidth(166)}
                height={responsiveHeight(-10)}
                max={400}
                maxLength={400}
                min={0}
                step={1}
                skin="clean"
                colorPress="#bcbcbc"
                value={qty}
                onChange={qty => this.setState({ qty })}
              />

              <Size
                width={responsiveWidth(166)}
                height={responsiveHeight(58)}
                label="Ukuran"
                fontSize={13}
                datas={size}
                selectedValue={selectedsize}
                onValueChange={selectedsize => this.selectedSize(selectedsize)}
              />
            </View>
          </View>
          <Distance height={20} />
          <View style={styles.wrapCart}>
            <View style={styles.cart}>
              <Button
                title="Tambah Keranjang"
                type="textIcon"
                icon="keranjang-putih"
                padding={responsiveHeight(17)}
                fontSize={18}
                loading={addCartLoading}
                onPress={() => this.toCart()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  addCartLoading: state.CartReducer.addCartLoading,
  addCartResult: state.CartReducer.addCartResult,
  addCartError: state.CartReducer.addCartError,

  getDetailProductLoading: state.ProductReducer.getDetailProductLoading,
  getDetailProductResult: state.ProductReducer.getDetailProductResult,
  getDetailProductError: state.ProductReducer.getDetailProductError,

  getSspResult: state.ProductReducer.getSspResult,
  getSspLoading: state.ProductReducer.getSspLoading,
});

export default connect(mapStateToProps, null)(ProductDetail);

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
    paddingHorizontal: 30,
  },
  name: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginTop: 20,
    color: colors.black,
  },
  discount: {
    fontSize: RFValue(20, heightMobileUI),
    fontFamily: fonts.primary.reguler,

    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: colors.red,
  },
  price: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  newPrice: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginRight: 5,
    color: colors.black,
  },
  line: {
    borderWidth: 0.3,
    marginVertical: 5,
  },
  wrapInput: {
    marginTop: responsiveHeight(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.primary.reguler,
    fontSize: 15,
  },
  cart: {
    alignContent: 'center',
  },
  wrapCart: {
    marginTop: 58,
    marginHorizontal: 30,
  },
});

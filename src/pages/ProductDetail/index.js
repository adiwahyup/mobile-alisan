import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
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
import { ProductSlider, Button, Distance, Size } from '../../components';
import { addCart } from '../../actions/CartAction';
import { getDetailProduct } from '../../actions/ProductAction';
import { connect } from 'react-redux';

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
    // console.log('tes split', split);

    // const ssp = getSspResult.map(item => {
    //   return item;
    // });
    // const split = ssp.split(', ')[0];

    // console.log('test map ssp', ssp);
    // this.setState({
    //   size: getSspResult,
    // });
  }

  componentDidUpdate(prevProps) {
    const { addCartResult, getSspResult } = this.props;

    if (addCartResult && prevProps.addCartResult !== addCartResult) {
      this.props.navigation.navigate('Cart');
    }
    if (getSspResult && prevProps.getSspResult !== getSspResult) {
      this.setState({
        size: getSspResult,
      });
    }
  }

  toCart = () => {
    const { qty, product_size, product } = this.state;
    // const discount = (product.product_price * product.product_discount) / 100;
    // const final = product.product_price - discount;
    getData('user').then(res => {
      if (res) {
        // add uid local storage to state
        this.setState({
          id: res.id,
          product_price: product.product_price,
          product_picture: product.product_picture.split(', ')[0],
        });

        if (qty && product_size) {
          // connect to action (cartAction)
          this.props.dispatch(addCart(this.state));
        } else {
          Alert.alert('Error', 'Please enter all the details');
        }
      } else {
        Alert.alert('Info', 'Silahkan Login atau Daftar terlebih dahulu');
        this.props.navigation.replace('Login');
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
            <Text style={styles.nama}>{product.product_name}</Text>
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
            <View style={styles.wrapWeight}>
              <Text style={styles.weight}>
                Berat: {product.product_weight} gram
              </Text>
            </View>
            <View style={styles.wrapInput}>
              <View style={styles.qty}>
                <Text styles={styles.label}>Amount :</Text>
                <InputSpinner
                  style={styles.input}
                  max={400}
                  maxLength={400}
                  min={0}
                  step={1}
                  skin="clean"
                  colorMax={'#ffffff'}
                  colorMin={'#ffffff'}
                  colorPress="#bcbcbc"
                  value={qty}
                  onChange={qty => this.setState({ qty })}
                />
              </View>

              <Size
                width={responsiveWidth(166)}
                height={responsiveHeight(48)}
                label="Size"
                fontSize={13}
                datas={size}
                selectedValue={selectedsize}
                onValueChange={selectedsize => this.selectedSize(selectedsize)}
              />
            </View>
            {/* <Input
              label="Notes"
              textarea
              fontSize={13}
              placeholder="Tambahkan catatan..."
              value={notes}
              onChangeText={notes => this.setState({ notes })}
            /> */}
            <Distance height={15} />
            <View style={styles.cart}>
              <Button
                title="Add to Cart"
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
    marginHorizontal: 30,
  },
  nama: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    marginTop: 20,
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
  },
  line: {
    borderWidth: 0.3,
    marginVertical: 5,
  },
  wrapWeight: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weight: {
    fontSize: 13,
    fontFamily: fonts.primary.reguler,
    marginRight: 30,
  },
  wrapInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: responsiveWidth(169),
    height: responsiveHeight(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 15,
    shadowRadius: 6.84,
    elevation: 2,
  },
  label: {
    fontFamily: fonts.primary.reguler,
    fontSize: 15,
  },
  cart: {
    alignContent: 'center',
  },
});

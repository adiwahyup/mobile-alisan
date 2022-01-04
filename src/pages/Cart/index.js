import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { cartProduct, getListCart } from '../../actions/CartAction';
import { ListCart, Button } from '../../components';
import { dummyProduct } from '../../data';
import {
  colors,
  numberFormat,
  responsiveHeight,
  fonts,
  getData,
} from '../../utils';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: dummyProduct,
      jwt: '',
    };
  }
  componentDidMount() {
    getData('user').then(res => {
      if (res) {
        this.props.dispatch(getListCart(res.id));
      } else {
        this.props.navigation.replace('Login');
      }
    });
    getData('token').then(res => {
      const jwt = res;
      if (jwt) {
        console.log('token jwt before checkout:', jwt);
        // this.setState({
        //   jwt: jwt,
        // });
      }
    });
    getData('user').then(res => {
      if (res) {
        this.props.dispatch(cartProduct(res.id));
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { deleteCartResult } = this.props;

    if (deleteCartResult && prevProps.deleteCartResult !== deleteCartResult) {
      getData('user').then(res => {
        if (res) {
          this.props.dispatch(getListCart(res.id));
          // getData('token').then(res => {
          //   const jwt = res;
          //   if (jwt) {
          //     console.log('token jwt update:', jwt);
          //   }
          // });
        } else {
          this.props.navigation.replace('Login');
        }
      });
    }
  }

  dataCart = () => {
    const { getListCartResult, cartProductResult } = this.props;

    Object.keys(cartProductResult).map((key, index) => {
      const dataProduct = cartProductResult;
      this.props.navigation.navigate('Checkout', {
        totalPrice: getListCartResult.totalPrice,
        totalWeight: getListCartResult.totalWeight,
        date: getListCartResult.date,
        dataProduct: dataProduct,
      });
    });
  };

  render() {
    const { product } = this.state;
    const { getListCartResult } = this.props;
    return (
      <View style={styles.page}>
        <ListCart {...this.props} product={product} />

        <View style={styles.footer}>
          <View style={styles.total}>
            <Text style={styles.textBold}>Total Price : </Text>
            <Text style={styles.textBold}>
              Rp{' '}
              {getListCartResult
                ? numberFormat(getListCartResult.totalPrice)
                : 0}
            </Text>
          </View>
          {getListCartResult ? (
            <Button
              title="Checkout"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              onPress={() => this.dataCart()}
            />
          ) : (
            <Button
              title="Checkout"
              type="textIcon"
              fontSize={18}
              padding={responsiveHeight(15)}
              icon="keranjang-putih"
              disable={true}
            />
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getListCartLoading: state.CartReducer.getListCartLoading,
  getListCartResult: state.CartReducer.getListCartResult,
  getListCartError: state.CartReducer.getListCartError,

  cartProductLoading: state.CartReducer.cartProductLoading,
  cartProductResult: state.CartReducer.cartProductResult,

  deleteCartLoading: state.CartReducer.deleteCartLoading,
  deleteCartResult: state.CartReducer.deleteCartResult,
  deleteCartError: state.CartReducer.deleteCartError,
});

export default connect(mapStateToProps, null)(Cart);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
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
    paddingBottom: 30,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});

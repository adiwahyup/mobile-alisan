import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getListCart } from '../../actions/CartAction';
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
      id: '',
    };
  }
  componentDidMount() {
    this.cartId();
  }

  cartId = () => {
    getData('user').then(res => {
      const id = res.uid;
      if (res) {
        this.setState({
          id: id,
        });
        this.props.dispatch(getListCart(id));
      }
    });
  };

  componentDidUpdate(prevProps) {
    const { deleteCartResult } = this.props;

    if (deleteCartResult && prevProps.deleteCartResult !== deleteCartResult) {
      getData('user').then(res => {
        if (res) {
          this.props.dispatch(getListCart(this.state.id));
        }
      });
    }
  }

  dataCart = () => {
    const { getListCartResult } = this.props;

    const dataProduct = Object.keys(getListCartResult.cart).map(
      (key, index) => {
        return getListCartResult.cart[key];
      },
    );
    this.props.navigation.navigate('Checkout', {
      totalPrice: getListCartResult.totalPrice,
      totalWeight: getListCartResult.totalWeight,
      date: getListCartResult.date,
      dataProduct: dataProduct,
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
            <Text style={styles.textBold}>Total Harga : </Text>
            <Text style={styles.textBold}>
              Rp{' '}
              {getListCartResult
                ? numberFormat(getListCartResult.totalPrice)
                : 0}
            </Text>
          </View>
          {getListCartResult ? (
            <Button
              title="Lanjutkan"
              type="text"
              fontSize={20}
              padding={responsiveHeight(15)}
              onPress={() => this.dataCart()}
            />
          ) : (
            <Button
              title="Lanjutkan"
              type="text"
              fontSize={18}
              padding={responsiveHeight(15)}
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
    color: colors.black,
  },
});

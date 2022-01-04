import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { colors, fonts, getData, responsiveHeight } from '../../../utils';
import { IconCari } from '../../../assets';
import { Distance, Button } from '../../SmallComponents';
import { connect } from 'react-redux';
import { saveKeywordProduct } from '../../../actions/ProductAction';
import { getListCart } from '../../../actions/CartAction';

class HeaderComponent extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     search: '',
  //   };
  // }
  componentDidMount() {
    getData('user').then(res => {
      if (res) {
        this.props.dispatch(getListCart(res.id));
      } else {
      }
    });
  }

  // finishSearch = () => {
  //   // console.log('Check Search: ', this.state.search);
  //   const { page, navigation, dispatch } = this.props;
  //   const { search } = this.state;
  //   // run action saveKeywordProduct
  //   dispatch(saveKeywordProduct(search.toLowerCase()));

  // console.log(search);
  // then if that is a home screen navigate to product screen
  // if (page !== 'Product') {
  //   navigation.navigate('Product');
  // }

  // return search state to empty string
  //   this.setState({
  //     search: '',
  //   });
  // };

  render() {
    // const { search } = this.state;
    const { navigation, getListCartResult } = this.props;

    let totalCart;
    if (getListCartResult) {
      totalCart = Object.keys(getListCartResult.cart).length;
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <View style={styles.wrapLogo}>
            <Text style={styles.logo}>Toko Alisan</Text>
          </View>
          {/* Input Pencarian */}
          {/* <View style={styles.searchSection}>
            <IconCari />
            <TextInput
              placeholder="Cari Produk.."
              style={styles.input}
              value={search}
              onChangeText={search => this.setState({ search })}
              onSubmitEditing={() => this.finishSearch()}
            />
          </View> */}
          <Distance width={10} />
          <Button
            icon="keranjang"
            padding={10}
            onPress={() => navigation.navigate('Cart')}
            totalCart={totalCart}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getListCartResult: state.CartReducer.getListCartResult,
});

export default connect(mapStateToProps, null)(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(110),
  },
  // searchSection: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   backgroundColor: colors.white,
  //   borderRadius: 5,
  //   paddingLeft: 15,
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  textInput: {
    fontSize: 16,
    fontFamily: fonts.primary.reguler,
  },
  wrapperHeader: {
    marginTop: 15,
    marginHorizontal: 35,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  logo: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
    color: colors.white,
    textAlign: 'left',
  },
  wrapLogo: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'flex-start',
  },
});

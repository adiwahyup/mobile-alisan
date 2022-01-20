import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getListProduct } from '../../actions/ProductAction';
import { HeaderComponent, ListProduct, Distance } from '../../components';
import { dummyProduct } from '../../data';
import { colors, fonts } from '../../utils';

class ProductScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_dummy: dummyProduct,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.dispatch(getListProduct());
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { product_dummy } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderComponent navigation={navigation} />

          <View style={styles.product}>
            <Text style={styles.label}>
              Semua <Text style={styles.boldLabel}>Produk</Text>
            </Text>
            <ListProduct
              navigation={navigation}
              product_dummy={product_dummy}
            />
          </View>

          <Distance height={50} />
        </ScrollView>
      </View>
    );
  }
}

export default connect()(ProductScreen);

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  product: {
    marginHorizontal: 30,
    marginTop: 25,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.semibold,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});

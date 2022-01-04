import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  HeaderComponent,
  ListCategory,
  ListProduct,
  Distance,
} from '../../components';
import { colors, fonts } from '../../utils';
// import { getListCategory } from '../../actions/CategoryAction';
import { getListProduct, popularProduct } from '../../actions/ProductAction';
import { dummyProduct } from '../../data/dummyProduct';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_dummy: dummyProduct,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // this.props.dispatch(getListCategory());
      this.props.dispatch(getListProduct());
    });
  }

  seeAll = () => {
    this.props.navigation.navigate('Product');
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { product_dummy } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderComponent navigation={navigation} page="Home" />
          <View style={styles.category}>
            {/* <Text style={styles.label}>Pilih Kategori</Text>
            <ListCategory navigation={navigation} /> */}
            {/* <ListCategory /> */}
          </View>
          <View style={styles.product}>
            <Text style={styles.label}>
              Popular <Text style={styles.boldLabel}>Product</Text>
            </Text>
            <ListProduct
              navigation={navigation}
              product_dummy={product_dummy}
            />
            <Button
              title="Lihat Semua"
              type="text"
              padding={7}
              onPress={() => this.seeAll()}
            />
          </View>

          <Distance height={50} />
        </ScrollView>
      </View>
    );
  }
}

export default connect()(HomeScreen);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  category: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  product: {
    marginHorizontal: 28,
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

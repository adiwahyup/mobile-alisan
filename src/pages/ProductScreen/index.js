import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getListProduct } from '../../actions/ProductAction';
import {
  HeaderComponent,
  ListProduct,
  ListCategory,
  Distance,
} from '../../components';
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
      // const { category_id } = this.props;
      // this.props.dispatch(getListCategory());
      this.props.dispatch(getListProduct());
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const { category_id, keyword } = this.props;

    if (category_id && prevProps.category_id !== category_id) {
      this.props.dispatch(getListProduct(category_id, keyword));
    }

    // if (keyword && prevProps.keyword !== keyword) {
    //   this.props.dispatch(getListProduct(keyword));
    // }
  }

  render() {
    const { product_dummy } = this.state;
    const { navigation, categoryName, keyword } = this.props;

    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} page="Product" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.product}>
            <ListCategory navigation={navigation} />
          </View>

          <View style={styles.product}>
            {keyword ? (
              <Text style={styles.label}>
                Cari: <Text style={styles.boldLabel}>{keyword}</Text>
              </Text>
            ) : (
              <Text style={styles.label}>
                All <Text style={styles.boldLabel}>The Best</Text>
                {categoryName ? categoryName : ' For You'}
              </Text>
            )}

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

const mapStateToProps = state => ({
  category_id: state.ProductReducer.category_id,
  categoryName: state.ProductReducer.categoryName,
  keyword: state.ProductReducer.keyword,
});

export default connect(mapStateToProps, null)(ProductScreen);

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
    marginTop: 10,
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

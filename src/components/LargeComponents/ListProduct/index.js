import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../utils';
import { CardProduct } from '../../SmallComponents';

const ListProduct = ({
  getListProductLoading,
  getListProductResult,
  getListProductError,
  navigation,
  product_dummy,
}) => {
  return (
    <View style={styles.container}>
      {getListProductResult.data ? (
        getListProductResult.data.map((product, index) => {
          return (
            <CardProduct
              key={product.product_id}
              product={product}
              navigation={navigation}
              product_dummy={product_dummy[index]}
            />
          );
        })
      ) : getListProductLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : getListProductError ? (
        <Text>{getListProductError}</Text>
      ) : (
        <Text>Empty Data</Text>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getListProductLoading: state.ProductReducer.getListProductLoading,
  getListProductResult: state.ProductReducer.getListProductResult,
  getListProductError: state.ProductReducer.getListProductError,
});

export default connect(mapStateToProps, null)(ListProduct);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
});

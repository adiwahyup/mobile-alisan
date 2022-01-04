import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { colors, fonts } from '../../../utils';
import { CardCart } from '../../SmallComponents';

const ListCart = ({
  getListCartLoading,
  getListCartResult,
  getListCartError,
  product,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {getListCartResult ? (
          Object.keys(getListCartResult.cart).map((key, index) => {
            return (
              <CardCart
                cart={getListCartResult.cart[key]}
                mainCart={getListCartResult}
                key={key}
                id={key}
                product={product[index]}
              />
            );
          })
        ) : getListCartLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : getListCartError ? (
          <Text>{getListCartError}</Text>
        ) : (
          <Text style={styles.cartEmpty}>Cart Empty</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default connect()(ListCart);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
  cartEmpty: {
    textAlign: 'center',
    fontFamily: fonts.primary.bold,
    fontSize: 15,
  },
});

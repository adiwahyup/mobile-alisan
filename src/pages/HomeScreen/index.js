import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  HeaderComponent,
  ListProduct,
  Distance,
} from '../../components';
import { colors, fonts } from '../../utils';
import { getLimitProduct } from '../../actions/ProductAction';
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
      this.props.dispatch(getLimitProduct());
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
          <HeaderComponent navigation={navigation} />
          <View style={styles.product}>
            <ListProduct
              navigation={navigation}
              product_dummy={product_dummy}
            />
            <Button
              title="Explore"
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

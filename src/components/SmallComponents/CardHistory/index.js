import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
  colors,
  responsiveHeight,
  responsiveWidth,
  numberFormat,
  fonts,
} from '../../../utils';
import Distance from '../Distance';
import { updateStatus } from '../../../actions/HistoryAction';

class CardHistory extends Component {
  componentDidMount() {
    const { order } = this.props;
    // this.props.dispatch(updateStatus(order.order_id));
  }
  payNow = () => {
    const { order } = this.props;
    if (order.status === 'paid') {
      Alert.alert('Info', 'You have paid for this order');
    } else {
      this.props.navigation.navigate('Payment', {
        order_redirect_url: order.order_redirect_url,
      });
    }
  };
  render() {
    const { order, updateStatusLoading } = this.props;
    console.log('Order', order);

    const history = order.orders;
    return (
      <TouchableOpacity style={styles.container} onPress={() => this.payNow()}>
        <Text style={styles.date}>{order.date}</Text>
        {Object.keys(history).map((key, index) => {
          return (
            <View key={index} style={styles.history}>
              <Text style={styles.textBold}>{index + 1}.</Text>
              <Image
                source={{ uri: history[key].product.product_picture[0] }}
                style={styles.product}
              />
              <View style={styles.desc}>
                <Text style={styles.name}>
                  {history[key].product.product_name}
                </Text>
                <Text style={styles.price}>
                  Rp {numberFormat(history[key].product.product_price)}
                </Text>

                <Distance height={3} />

                <Text style={styles.textBold}>
                  Quantity : {history[key].qty}
                </Text>
                <Text style={styles.textBold}>
                  Total Price : Rp {numberFormat(history[key].totalPrice)}
                </Text>
              </View>
            </View>
          );
        })}

        <Distance height={10} />
        <View style={styles.footer}>
          <View style={styles.label}>
            <Text style={styles.textBlueLeft}>Status :</Text>
            <Text style={styles.textBlueLeft}>
              Estimation ({order.order_estimation}) days :
            </Text>
            <Text style={styles.textBlueLeft}>Total Price :</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.textBlueRight}>
              {updateStatusLoading ? 'Loading' : order.order_status}
            </Text>
            <Text style={styles.textBlueRight}>
              {numberFormat(order.order_shipping_cost)}
            </Text>
            <Text style={styles.textBlueRight}>
              Rp {numberFormat(order.totalPrice + order.order_shipping_cost)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  updateStatusLoading: state.HistoryReducer.updateStatusLoading,
});

export default connect(mapStateToProps, null)(CardHistory);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    padding: 10,
    borderRadius: 15,
    marginTop: -15,
    marginBottom: 30,
  },
  history: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 5,
  },
  product: {
    width: responsiveWidth(66),
    height: responsiveHeight(66),
  },
  date: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  textBold: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
  },
  desc: {
    marginLeft: responsiveWidth(6),
  },
  name: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
    width: responsiveWidth(250),
  },
  price: {
    fontSize: 13,
    fontFamily: fonts.primary.reguler,
  },
  footer: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
  },
  textBlueRight: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
  textBlueLeft: {
    fontSize: 12,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    textAlign: 'left',
  },
});

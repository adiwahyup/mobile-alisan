import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { yourOrder } from '../../../actions/HistoryAction';
import {
  colors,
  responsiveHeight,
  numberFormat,
  fonts,
  dateFormat,
} from '../../../utils';
import Distance from '../Distance';

class CardHistory extends Component {
  getDetail = () => {
    const { token, order } = this.props;
    let data = {
      token: token,
      order_id: order.order_id,
    };
    this.props.dispatch(yourOrder(data));
    this.props.navigation.navigate('YourOrder');
  };

  render() {
    const { order } = this.props;
    const tanggal = order.order_purchase;
    const id = order.order_id;

    return (
      <View style={styles.wrapButton}>
        <Distance height={responsiveHeight(20)} />

        <TouchableOpacity
          key={order.order_id}
          style={styles.container}
          onPress={this.getDetail}>
          <View style={styles.history}>
            <View style={styles.wrapHeader}>
              <Text style={styles.textBold}>Tanggal Order :</Text>
              <Text style={styles.textBold}>Total Order :</Text>
              <Text style={styles.textBold}>Status Order :</Text>
            </View>
            <View style={styles.wrapFill}>
              <Text style={styles.textBlue}>{dateFormat(tanggal)}</Text>
              <Text style={styles.textBlue}>
                Rp {numberFormat(order.order_total)}
              </Text>
              <Text style={styles.textBlue}>{order.order_status}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  showByUserIdLoading: state.HistoryReducer.showByUserIdLoading,
  showByUserIdResult: state.HistoryReducer.showByUserIdResult,
  showByUserIdError: state.HistoryReducer.showByUserIdError,
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
    padding: 20,
    borderRadius: 10,
    marginTop: -10,
    marginVertical: 20,
  },
  wrapButton: {
    // paddingTop: -50,
  },
  date: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
  },
  textBold: {
    fontSize: 13,
    fontFamily: fonts.primary.bold,
    textTransform: 'uppercase',
    color: colors.black,
    // textAlign: 'left',
    // textAlign: 'center',
  },
  textBlue: {
    fontSize: 14,
    fontFamily: fonts.primary.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    alignItems: 'center',
  },
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapHeader: {},
  wrapFill: {},
});

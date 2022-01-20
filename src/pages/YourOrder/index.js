import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ListYourOrder, Button } from '../../components';
import {
  colors,
  responsiveHeight,
  fonts,
  numberFormat,
  dateStrip,
} from '../../utils';

class YourOrder extends Component {
  Payment = () => {
    const { userOrderResult } = this.props;
    const order = userOrderResult;

    const params = {
      redirect_url: userOrderResult.order_redirect_url,
    };
    let date = new Date(order.order_purchase);
    date.setDate(date.getDate() + 1);
    console.log(date);
    // this.props.navigation.navigate('Payment', params);
  };

  render() {
    const { userOrderResult, userOrderLoading } = this.props;
    const order = userOrderResult;

    return (
      <View style={styles.pages}>
        <ListYourOrder navigation={this.props.navigation} />
        {userOrderLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View style={styles.footer}>
            <View style={styles.shipping}>
              <Text style={styles.textBold}>Biaya Kirim : </Text>
              <Text style={styles.textBold}>
                Rp. {order ? numberFormat(order.order_shipping_cost) : 0}
              </Text>
            </View>
            <View style={styles.total}>
              <Text style={styles.textBold}>Total Order : </Text>
              <Text style={styles.textBold}>
                Rp
                {order ? numberFormat(order.order_total) : 0}
              </Text>
            </View>
            {order.order_status === 'paid' ? (
              <View style={styles.status}>
                <Text style={styles.textStatus}>
                  Terimakasih Sudah Belanja di Toko Alisan
                </Text>
              </View>
            ) : (
              <Button
                title="Bayar"
                type="text"
                fontSize={18}
                padding={responsiveHeight(15)}
                disable={true}
                onPress={() => this.Payment()}
                loading={userOrderLoading}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userOrderLoading: state.HistoryReducer.userOrderLoading,
  userOrderResult: state.HistoryReducer.userOrderResult,
});
export default connect(mapStateToProps, null)(YourOrder);

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
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
    paddingBottom: 20,
    paddingTop: 10,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    paddingBottom: 5,
  },
  textBold: {
    fontSize: 17,
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  shipping: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStatus: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.textGreen,
  },
  status: {
    borderRadius: 25,
    padding: responsiveHeight(15),
    backgroundColor: colors.lightGreen,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});

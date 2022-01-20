import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../utils';
import { CardYourOrder } from '../../SmallComponents';

const ListYourOrder = ({
  userOrderLoading,
  orderDetailLoading,
  orderDetailResult,
  userOrderResult,
  navigation,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {userOrderResult ? (
          <CardYourOrder
            yourorder={userOrderResult}
            orderdetail={orderDetailResult}
            navigation={navigation}
          />
        ) : userOrderLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <Text>Data Kosong</Text>
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  userOrderLoading: state.HistoryReducer.userOrderLoading,
  userOrderResult: state.HistoryReducer.userOrderResult,
  userOrderError: state.HistoryReducer.userOrderError,

  orderDetailLoading: state.HistoryReducer.orderDetailLoading,
  orderDetailResult: state.HistoryReducer.orderDetailResult,
  orderDetailError: state.HistoryReducer.orderDetailError,
});
export default connect(mapStateToProps, null)(ListYourOrder);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});

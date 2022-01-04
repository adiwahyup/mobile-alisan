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
import { CardHistory } from '../../SmallComponents';

const ListHistory = ({
  orderHistoryLoading,
  orderHistoryResult,
  navigation,
}) => {
  // console.log('list history: ', orderHistoryResult);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {orderHistoryResult ? (
          Object.keys(orderHistoryResult).map(key => {
            return (
              <CardHistory
                order={orderHistoryResult[key]}
                key={key}
                navigation={navigation}
                id={key}
              />
            );
          })
        ) : orderHistoryLoading ? (
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
  orderHistoryLoading: state.HistoryReducer.orderHistoryLoading,
  orderHistoryResult: state.HistoryReducer.orderHistoryResult,
});
export default connect(mapStateToProps, null)(ListHistory);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});

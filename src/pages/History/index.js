import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { orderHistory } from '../../actions/HistoryAction';
import { ListHistory } from '../../components';
import { colors, getData } from '../../utils';

class History extends Component {
  componentDidMount() {
    getData('user').then(res => {
      const data = res;

      if (!data) {
        this.props.navigation.replace('Login');
      } else {
        this.props.dispatch(orderHistory(data.id));
      }
    });
  }

  render() {
    return (
      <View style={styles.pages}>
        <ListHistory navigation={this.props.navigation} />
      </View>
    );
  }
}

export default connect()(History);

const styles = StyleSheet.create({
  pages: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

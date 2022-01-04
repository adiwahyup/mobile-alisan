import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/OrderAction';
import { colors } from '../../utils';

export class Payment extends Component {
  componentDidMount() {
    if (this.props.route.params.order_id) {
      console.log(
        'cek data params masuk payment page: ',
        this.props.route.params,
      );
      this.props.dispatch(updateCart(this.props.route.params));
    }
  }

  // onMessage = data => {
  //   if (data.nativeEvent.data === 'paid') {
  //     this.props.navigation.replace('History');
  //   }
  // };

  handleNavigationStateChange = navState => {
    console.log('navState ' + JSON.stringify(navState));
  };

  render() {
    const { updateCartLoading } = this.props;
    return (
      <>
        {updateCartLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <WebView
            source={{ uri: this.props.route.params.redirect_url }}
            // onMessage={this.onMessage}
            onNavigationStateChange={data =>
              this.handleNavigationStateChange(data)
            }
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  updateCartLoading: state.OrderReducer.updateCartLoading,
});
export default connect(mapStateToProps, null)(Payment);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});

import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/OrderAction';
import { colors } from '../../utils';

export class Payment extends Component {
  componentDidMount() {
    if (this.props.route.params.order_id) {
      //   this.props.dispatch(updateCart(this.props.route.params));
    }
  }

  handleNavigationStateChange = navState => {
    // const local = 'lar8api-web-mobile, http://';
    // const ngrok = 'http://example.com';

    // const conditions = ['lar8api-web-mobile', 'http://', 'http://example.com'];
    // const result1 = conditions.some(el => local.includes(el));
    // const result2 = conditions.some(el => ngrok.includes(el));
    console.log('current state is ', JSON.stringify(navState, null, 2));
    if (navState.url.includes('lar8api-web-mobile' || 'http://example.com')) {
      this.props.navigation.replace('History');
    } else {
      console.log(navState);
    }
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
            // onMessage={event => {
            //   console.log(event);
            //   event.nativeEvent.data;
            // }}
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

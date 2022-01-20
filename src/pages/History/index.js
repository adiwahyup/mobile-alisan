import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { showByUserId } from '../../actions/HistoryAction';
import { ListHistory } from '../../components';
import { colors, getData } from '../../utils';

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    getData('user').then(res => {
      const user = res;

      if (!user) {
        this.props.navigation.replace('Login');
      } else {
        this.dataUser(user);
      }
    });
  }

  dataUser = user => {
    getData('token').then(res => {
      const token = res;
      if (!token) {
      } else {
        this.setState({
          token: token,
        });
        this.setState({
          user_id: user.uid,
        });
        this.props.dispatch(showByUserId(this.state));
      }
    });
  };

  render() {
    const { token } = this.state;
    return (
      <View style={styles.pages}>
        <ListHistory navigation={this.props.navigation} token={token} />
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

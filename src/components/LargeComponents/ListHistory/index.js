import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { clearStorage, colors, responsiveWidth } from '../../../utils';
import { CardHistory } from '../../SmallComponents';
import Dialog from 'react-native-dialog';

const ListHistory = ({
  showByUserIdLoading,
  showByUserIdResult,
  showByUserIdError,
  navigation,
  token,
}) => {
  const [visible, setVisible] = useState(true);
  function showDialog() {
    setVisible(true);
  }
  const handleHome = () => {
    setVisible(false);
    navigation.navigate('Home');
  };
  const handleLogin = () => {
    clearStorage();
    navigation.replace('Login');

    setVisible(false);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {showByUserIdResult.length ? (
          Object.keys(showByUserIdResult).map(key => {
            return (
              <CardHistory
                order={showByUserIdResult[key]}
                key={key}
                navigation={navigation}
                id={key}
                token={token}
              />
            );
          })
        ) : showByUserIdLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : showByUserIdError ? (
          <View style={styles.dialog}>
            {showDialog}
            <Dialog.Container visible={visible}>
              <Dialog.Title>Info</Dialog.Title>
              <Dialog.Description>Silahkan Login Kembali</Dialog.Description>
              <Dialog.Button label="Home" onPress={handleHome} />
              <Dialog.Button label="Login" onPress={handleLogin} />
            </Dialog.Container>
          </View>
        ) : (
          <Text>Data Kosong</Text>
        )}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  showByUserIdLoading: state.HistoryReducer.showByUserIdLoading,
  showByUserIdResult: state.HistoryReducer.showByUserIdResult,
  showByUserIdError: state.HistoryReducer.showByUserIdError,
});
export default connect(mapStateToProps, null)(ListHistory);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: responsiveWidth(20),
    marginTop: 10,
  },
  dialog: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 50,
  },
});

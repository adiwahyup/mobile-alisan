import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Button, Input } from '../../components';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  getData,
} from '../../utils';
import { updateProfile } from '../../actions/ProfileAction';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      address: '',
      pic: 'false',
      picApi: '',
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps) {
    const { updateProfileResult } = this.props;

    if (
      updateProfileResult &&
      prevProps.updateProfileResult !== updateProfileResult
    ) {
      Alert.alert('Profile Updated! ');
      this.props.navigation.replace('MainApp');
    }
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;
      this.setState({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
    });
  };

  getImage = () => {
    launchImageLibrary(
      {
        quality: 1,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
        selectionLimit: 1,
        cameraType: 'front',
        saveToPhotos: true,
      },
      res => {
        if (res.didCancel || res.errorCode || res.errorMessage) {
          Alert.alert('Error', 'Gagal saat memilih foto');
        } else {
          const source = res.assets[0].uri;
          const fileString = `data:${res.assets[0].type};base64,${res.assets[0].base64}`;

          this.setState({
            pic: source,
            picApi: fileString,
          });
        }
      },
    );
  };

  onSubmit = () => {
    const { name, phone, address } = this.state;
    if (name && phone && address) {
      // dispatch update
      this.props.dispatch(updateProfile(this.state));
    } else {
      Alert.alert('Harap isi semua data');
    }
  };

  render() {
    const { name, email, phone, address } = this.state;
    const { updateProfileLoading } = this.props;

    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Nama"
            value={name}
            onChangeText={name => this.setState({ name })}
          />
          <Input label="Email" value={email} disabled />
          <Input
            label="Telepon"
            keyboardType="number-pad"
            value={phone}
            onChangeText={phone => this.setState({ phone })}
          />
          <Input
            label="Alamat"
            value={address}
            onChangeText={address => this.setState({ address })}
            textarea
          />
          {/* <Option label="Kota/Kab" datas={dataCity} />
          <Option label="Provinsi" datas={dataProvince} /> */}
          {/* <View style={styles.inputPic}>
            <Text style={styles.label}>Foto Profil :</Text> */}
          {/* <View style={styles.wrapUpload}>
              <Image source={pic ? pic : DefaultPic} style={styles.pic} />

              <View style={styles.buttonPic}>
                <Button
                  title="Change Picture"
                  type="text"
                  padding={8}
                  onPress={() => this.getImage()}
                />
              </View>
            </View> */}
          {/* </View> */}
          <View style={styles.submit}>
            <Button
              loading={updateProfileLoading}
              title="Submit"
              type="textIcon"
              icon="submit"
              padding={responsiveHeight(10)}
              fontSize={18}
              onPress={() => this.onSubmit()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  updateProfileLoading: state.ProfileReducer.updateProfileLoading,
  updateProfileResult: state.ProfileReducer.updateProfileResult,
  updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(EditProfile);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  inputPic: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  pic: {
    width: responsiveWidth(120),
    height: responsiveHeight(134),
    borderRadius: 50,
  },
  wrapUpload: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonPic: {
    marginLeft: 35,
    flex: 1,
    marginTop: 15,
  },
  submit: {
    marginVertical: 30,
    marginBottom: 30,
  },
});

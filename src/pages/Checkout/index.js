import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Option, Distance, Button } from '../../components';
import Dialog from 'react-native-dialog';
import {
  colors,
  discount,
  fonts,
  getData,
  numberFormat,
  responsiveHeight,
} from '../../utils';
import {
  getProvinceList,
  getCityList,
  shippingCost,
} from '../../actions/RajaOngkirAction';
import { couriers } from '../../data';
import { postOrder } from '../../actions/OrderAction';
import { getCoupon } from '../../actions/CouponAction';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
      visible: false,
      user_id: '',
      couriers: couriers,
      expedition: false,
      serviceSelected: false,
      service: '',
      shippingCost: 0,
      estimation: '',
      productCart: '',
      cart: this.props.route.params.dataProduct,
      subTotal: this.props.route.params.totalPrice,
      totalWeight: this.props.route.params.totalWeight,
      city: false,
      province: false,
      address: '',
      coupon: '',
      couponid: '',
      couponvalue: '',
      coupondiscount: '',
      token: '',
      alamat: '',
      applied: false,
      disabled: false,
    };
  }
  componentDidMount() {
    this.getUserData();
    this.props.dispatch(getProvinceList());
  }

  componentDidUpdate(previousProps) {
    const { getCouponResult, postOrderResult } = this.props;

    if (getCouponResult && previousProps.getCouponResult !== getCouponResult) {
      Alert.alert('Sukses', 'Kupon Berhasil Digunakan');
      const aftercoupon = getCouponResult;
      if (aftercoupon) {
        this.couponId(aftercoupon);
      }
    }
    if (postOrderResult && previousProps.postOrderResult !== postOrderResult) {
      this.props.navigation.navigate('Order', this.state);
    }
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        this.setState({
          user_id: data.uid,
          address: data.address,
        });
      }
      getData('token').then(response => {
        const token = response;
        if (token) {
          this.setState({
            token: token,
          });
        }
      });
    });
  };

  onCouponChange = () => {
    this.setState({
      disabled: false,
      applied: false,
    });
  };

  couponId = aftercoupon => {
    console.log('tes coupon masuk', aftercoupon);
    let coupon_value =
      (this.state.subTotal * aftercoupon.coupon_discount) / 100;
    if (aftercoupon) {
      this.setState({
        couponvalue: coupon_value,
        couponid: aftercoupon.coupon_id,
        coupondiscount: aftercoupon.coupon_discount,
        applied: true,
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  };
  changeProvince = province => {
    this.setState({
      province: province,
    });
    this.props.dispatch(getCityList(province));
  };

  changeCouriers = expedition => {
    if (expedition) {
      this.setState({
        expedition: expedition,
      });
      this.props.dispatch(shippingCost(this.state, expedition));
    }
  };

  setCity = city => {
    const { cart } = this.state;
    let product = Object.keys(cart).map((key, index) => {
      return cart[key];
    });

    if (city) {
      this.setState({
        city: city,
        productCart: product,
      });
    }
  };

  serviceSelected = service => {
    if (service) {
      this.setState({
        serviceSelected: service,
        service: service.service,
        shippingCost: service.cost[0].value,
        estimation: service.cost[0].etd,
      });
    }
  };
  couponApply = coupon => {
    this.setState({ coupon });
  };

  getCoupon = () => {
    const { coupon } = this.state;
    const data = {
      coupon: coupon,
    };

    if (data) {
      this.setState({ coupon });
      this.props.dispatch(getCoupon(data));
    } else {
      this.setState({
        disabled: true,
      });
    }
  };
  showDialog = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleChange = () => {
    const { alamat } = this.state;
    if (alamat) {
      this.setState({ address: alamat });
      Alert.alert('Sukses', 'Alamat berhasil diubah');
    } else {
      Alert.alert('Gagal', 'Alamat tidak boleh kosong');
    }
    this.setState({ visible: false });
  };

  orderUser = () => {
    if (this.state.shippingCost !== 0) {
      this.props.dispatch(postOrder(this.state));
    } else {
      Alert.alert('Info', 'Isi Semua Detail Pengiriman');
    }
  };

  render() {
    const {
      expedition,
      couriers,
      address,
      city,
      province,
      shippingCost,
      serviceSelected,
      subTotal,
      coupon,
      visible,
      coupondiscount,
      applied,
      disabledText,
    } = this.state;

    const {
      getCityResult,
      getProvinceResult,
      costResult,
      getCouponLoading,
      postOrderLoading,
    } = this.props;
    const totalPrice = subTotal + shippingCost;

    return (
      <View style={styles.pages}>
        <View style={styles.isi}>
          <Option
            label="Provinsi"
            datas={getProvinceResult ? getProvinceResult : []}
            selectedValue={province}
            onValueChange={province => this.changeProvince(province)}
          />
          <Option
            label="Kota/Kab"
            datas={getCityResult ? getCityResult : []}
            selectedValue={city}
            onValueChange={(city, index) => this.setCity(city)}
          />
          <Option
            label="Ekspedisi"
            datas={couriers}
            selectedValue={expedition}
            onValueChange={expedition => this.changeCouriers(expedition)}
          />
          <Option
            label="Paket"
            datas={costResult ? costResult : []}
            selectedValue={serviceSelected}
            onValueChange={serviceSelected =>
              this.serviceSelected(serviceSelected)
            }
          />

          <Distance height={20} />
          <View style={styles.textCoupon}>
            <Text style={styles.textBold}>Masukkan Kode Kupon</Text>
          </View>
          <View style={styles.wrapCoupon}>
            <View style={styles.coupon}>
              <TextInput
                style={styles.input}
                placeholder="Kode Kupon"
                autoCapitalize="characters"
                value={coupon}
                editable={disabledText ? disabledText : true}
                onChangeText={this.couponApply}
              />
            </View>
            <View style={styles.apply}>
              <Button
                loading={getCouponLoading}
                type="text"
                title={applied ? 'Dipakai' : 'Pakai'}
                padding={responsiveHeight(13)}
                borderRadius={12}
                fontSize={18}
                backgroundColor={applied ? colors.blue : colors.primary}
                onPress={() => this.getCoupon()}
              />
            </View>
          </View>
          <Distance height={20} />
          <Text style={styles.title}>Ubah Alamat? </Text>
          <View style={styles.wrapAlamat}>
            <View style={styles.wrapTextAddress}>
              <Text style={styles.textAddress}>{address}</Text>
            </View>
            <View style={styles.wrapChangeAddress}>
              <TouchableOpacity onPress={this.showDialog}>
                <Text style={styles.editAddress}>Ubah Alamat</Text>
              </TouchableOpacity>
            </View>
            <Dialog.Container
              visible={visible}
              onBackdropPress={this.handleCancel}>
              <Dialog.Title>Alamat Baru</Dialog.Title>
              <Dialog.Input
                style={styles.inputAddress}
                multiline={true}
                numberOfLines={3}
                maxLength={999}
                onChangeText={alamat => this.setState({ alamat })}
              />

              <Dialog.Button
                style={styles.dialog}
                label="Batal"
                onPress={this.handleCancel}
              />
              <Dialog.Button
                style={styles.dialog}
                label="Ubah Alamat"
                onPress={this.handleChange}
              />
            </Dialog.Container>
          </View>
        </View>
        <Distance height={33} />

        <View style={styles.footer}>
          <View style={styles.ongkir}>
            <Text style={styles.textBold}>Biaya Kirim</Text>
            <Text style={styles.textBold}>Rp {numberFormat(shippingCost)}</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.textBold}>Total Harga</Text>
            <Text style={styles.textBold}>
              Rp{numberFormat(discount(totalPrice, coupondiscount))}
            </Text>
          </View>
          <Button
            loading={postOrderLoading}
            title="Lanjutkan Checkout"
            type="text"
            fontSize={20}
            padding={responsiveHeight(15)}
            onPress={() => this.orderUser()}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getProvinceResult: state.RajaOngkirReducer.getProvinceResult,
  getCityResult: state.RajaOngkirReducer.getCityResult,

  getCouponResult: state.CouponReducer.getCouponResult,
  getCouponLoading: state.CouponReducer.getCouponLoading,

  postOrderLoading: state.OrderReducer.postOrderLoading,
  postOrderResult: state.OrderReducer.postOrderResult,

  costResult: state.RajaOngkirReducer.costResult,
});
export default connect(mapStateToProps, null)(Checkout);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: responsiveHeight(30),
  },
  isi: {
    paddingHorizontal: 25,
    backgroundColor: colors.white,
  },
  wrapAlamat: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
  },

  inputAddress: {
    fontSize: 18,
    fontFamily: fonts.primary.reguler,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
  title: {
    fontFamily: fonts.primary.bold,
    fontSize: 16,
    marginBottom: 5,
  },
  textAddress: {
    fontFamily: fonts.primary.reguler,
    fontSize: 16,
  },
  wrapTextAddress: {
    justifyContent: 'flex-start',
  },
  wrapChangeAddress: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editAddress: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    color: colors.primary,
    textAlign: 'right',
  },
  textBold: {
    fontSize: 16,
    fontFamily: fonts.primary.bold,
    color: colors.black,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: responsiveHeight(30),
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 5,
  },
  ongkir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
  },
  coupon: {
    flex: 2,
  },
  apply: {
    flex: 1,
    marginLeft: 10,
  },
  wrapCoupon: {
    flexDirection: 'row',
  },
  input: {
    fontFamily: fonts.primary.bold,
    padding: responsiveHeight(10),
    textTransform: 'uppercase',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    color: colors.black,
  },
  textCoupon: {
    marginBottom: 10,
    marginLeft: 6,
    color: colors.black,
  },
  dialog: {
    color: colors.primary,
    fontFamily: fonts.primary.bold,
  },
});

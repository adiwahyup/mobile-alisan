import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { CardAddress, Option, Distance, Button } from '../../components';
import {
  colors,
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

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
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
    };
  }
  componentDidMount() {
    this.getUserData();
    this.props.dispatch(getProvinceList());
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;

      if (data) {
        this.setState({
          user_id: data.id,
          address: data.address,
        });
      } else {
        this.props.navigation.replace('Login');
      }
    });
  };

  // componentDidUpdate(prevProps) {
  //   const { postOrderResult } = this.props;

  //   if (postOrderResult && prevProps.postOrderResult !== postOrderResult) {
  //     console.log('params post order api: ', postOrderResult);
  //     const params = {
  //       redirect_url: postOrderResult.snaptoken.redirect_url,
  //       token: postOrderResult.snaptoken.token,
  //     };
  //     this.props.navigation.navigate('Payment', params);
  //   }
  // }

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
      // delete cart[key].totalWeight;
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

  yourOrder = () => {
    if (this.state.shippingCost !== 0) {
      this.props.dispatch(postOrder(this.state));
      this.props.navigation.navigate('Order', this.state);
    } else {
      Alert.alert('Error', 'Please choose package first');
    }
  };

  render() {
    const {
      expedition,
      couriers,
      totalWeight,
      address,
      city,
      province,
      shippingCost,
      estimation,
      serviceSelected,
      subTotal,
    } = this.state;

    const { getCityResult, getProvinceResult, costResult, navigation } =
      this.props;

    return (
      <ScrollView style={styles.pages} showsVerticalScrollIndicator={false}>
        <View style={styles.isi}>
          <Text style={styles.textBold}>Is this your correct address?</Text>
          <CardAddress
            address={address}
            province={province}
            city={city}
            navigation={navigation}
          />
          <View style={styles.price}>
            <Text style={styles.textBold}>Product Price: </Text>
            <Text style={styles.textBold}>Rp {numberFormat(subTotal)}</Text>
          </View>
          <Option
            label="Province"
            datas={getProvinceResult ? getProvinceResult : []}
            selectedValue={province}
            onValueChange={province => this.changeProvince(province)}
          />
          <Option
            label="City/District"
            datas={getCityResult ? getCityResult : []}
            selectedValue={city}
            onValueChange={(city, index) => this.setCity(city)}
          />
          <Option
            label="Expedition"
            datas={couriers}
            selectedValue={expedition}
            onValueChange={expedition => this.changeCouriers(expedition)}
          />
          <Option
            label="Package"
            datas={costResult ? costResult : []}
            selectedValue={serviceSelected}
            onValueChange={serviceSelected =>
              this.serviceSelected(serviceSelected)
            }
          />

          <Distance height={18} />

          <Text style={styles.textBold}>Shipping Cost :</Text>
          <View style={styles.ongkir}>
            <Text style={styles.text}>Total Weight : {totalWeight} gram</Text>
            <Text style={styles.textBold}>Rp {numberFormat(shippingCost)}</Text>
          </View>
          <View style={styles.ongkir}>
            <Text style={styles.text}>Estimated Time (in days):</Text>
            <Text style={styles.textBold}>{estimation}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.total}>
            <Text style={styles.textBold}>Total Price : </Text>
            <Text style={styles.textBold}>
              Rp{numberFormat(subTotal + shippingCost)}
            </Text>
          </View>

          <Button
            title="Continue"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            onPress={() => this.yourOrder()}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  getProvinceResult: state.RajaOngkirReducer.getProvinceResult,
  getCityResult: state.RajaOngkirReducer.getCityResult,

  costResult: state.RajaOngkirReducer.costResult,
});
export default connect(mapStateToProps, null)(Checkout);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    marginTop: 10,
  },
  isi: {
    paddingHorizontal: 30,
  },
  textBold: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
  text: {
    fontSize: 17,
    fontFamily: fonts.primary.reguler,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
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
    marginBottom: 10,
  },
  footer: {
    flex: 1,
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
    paddingBottom: responsiveHeight(55),
  },
});

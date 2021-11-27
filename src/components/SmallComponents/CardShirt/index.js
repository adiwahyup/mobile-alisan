import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import {
  colors,
  fonts,
  responsiveWidth,
  numberWithCommas,
} from '../../../utils';
import Button from '../Button';

const CardShirt = ({ shirt, navigation }) => {
  //   console.log(shirt.gambar);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Image source={shirt.gambar[0]} style={styles.gambar} />
        <Text style={styles.text}>{shirt.nama}</Text>
        <Text style={styles.harga}>Rp {numberWithCommas(shirt.harga)}</Text>
      </TouchableOpacity>

      <Button
        type="text"
        title="Detail"
        padding={7}
        onPress={() => navigation.navigate('ProductDetail', { shirt })}
      />
    </View>
  );
};

export default CardShirt;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  card: {
    backgroundColor: colors.lightCard,
    width: responsiveWidth(150),
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    marginBottom: 12,
  },
  gambar: {
    width: 120,
    height: 130,
  },
  text: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  harga: {
    fontFamily: fonts.primary.bold,
    fontSize: 13,
    textAlign: 'center',
  },
});

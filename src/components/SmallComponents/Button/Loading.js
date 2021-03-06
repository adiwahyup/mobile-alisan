import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../../../utils';
import Distance from '../Distance';

const Loading = ({ padding, fontSize }) => {
  return (
    <TouchableOpacity style={styles.container(padding)}>
      <ActivityIndicator size="small" color="#FFFFFF" />
      <Distance width={5} />
      <Text style={styles.title(fontSize)}>Loading...</Text>
    </TouchableOpacity>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: padding => ({
    backgroundColor: colors.border,
    padding: padding,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  title: fontSize => ({
    color: colors.white,
    fontSize: fontSize ? fontSize : 15,
    fontFamily: fonts.primary.bold,
  }),
});

import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../utils';
import { CardCategory } from '../../SmallComponents';

const ListCategory = ({
  getListCategoryLoading,
  getListCategoryResult,
  getListCategoryError,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {getListCategoryResult ? (
        getListCategoryResult.map(category => {
          return (
            <CardCategory
              navigation={navigation}
              category={category}
              key={category.category_id}
              id={category.category_id}
            />
          );
        })
      ) : getListCategoryLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : getListCategoryError ? (
        <Text>getListCategoryError</Text>
      ) : (
        <Text>Empty Data</Text>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getListCategoryLoading: state.CategoryReducer.getListCategoryLoading,
  getListCategoryResult: state.CategoryReducer.getListCategoryResult,
  getListCategoryError: state.CategoryReducer.getListCategoryError,
});

export default connect(mapStateToProps, null)(ListCategory);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
});

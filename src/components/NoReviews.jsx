import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

const NoReviews = () => {
  return (
    <View style={styles.container}>
      <Text align="center">No reviews</Text>
    </View>
  );
};

export default NoReviews;

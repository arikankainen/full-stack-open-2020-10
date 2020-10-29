import React from 'react';
import { View, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';
import formatDate from '../utils/formatDate';

const styles = StyleSheet.create({
  container: {
    ...theme.whiteContainerWithShadow,
    flexDirection: 'row',
  },
  reviewContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flexShrink: 1,
    marginLeft: 20,
  },
  textName: {
    fontWeight: theme.fontWeights.bold,
  },
  textDate: {
    marginBottom: 5,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">
          {review.rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{review.user.username}</Text>
        <Text style={styles.textDate}>{formatDate(review.createdAt)}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;

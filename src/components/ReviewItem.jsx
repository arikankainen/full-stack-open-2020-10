import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useHistory } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import formatDate from '../utils/formatDate';
import Button from './Button';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    ...theme.whiteContainerWithShadow,
  },
  horizontalContainer: {
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
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonGap: {
    width: 20,
  },
});

const ReviewItem = ({ review, isMyReview, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();
  const reviewTopic = isMyReview ? review.repository.fullName : review.user.username;

  const handleViewRepository = () => {
    history.push(`/repository/${review.repository.id}`);
  };

  const handleDeleteReviewConfirmation = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: handleDeleteReview },
    ]);
  };

  const handleDeleteReview = async () => {
    await deleteReview(review.id);
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <View style={styles.reviewContainer}>
          <Text color="primary" fontWeight="bold" fontSize="subheading">
            {review.rating}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{reviewTopic}</Text>
          <Text style={styles.textDate}>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {isMyReview && (
        <View style={styles.buttonContainer}>
          <Button text="View repository" onPress={handleViewRepository} />
          <View style={styles.buttonGap} />
          <Button text="Delete review" onPress={handleDeleteReviewConfirmation} warning />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;

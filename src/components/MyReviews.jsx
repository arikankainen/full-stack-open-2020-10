import React from 'react';
import { FlatList } from 'react-native';

import ReviewItem from './ReviewItem';
import useMyReviews from '../hooks/useMyReviews';
import Spinner from './Spinner';
import ListItemSeparator from './ListItemSeparator';
import NoReviews from './NoReviews';

const MyReviews = () => {
  const { authorizedUser, fetchMore } = useMyReviews({ first: 10 });

  const reviews = authorizedUser ? authorizedUser.reviews.edges.map(edge => edge.node) : [];

  if (!reviews) return <Spinner />;

  const handleEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} isMyReview={true} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ListItemSeparator}
      ListEmptyComponent={NoReviews}
      onEndReached={handleEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;

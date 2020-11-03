import React from 'react';
import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useSingleRepository from '../hooks/useSingleRepository';
import Spinner from './Spinner';
import ListItemSeparator from './ListItemSeparator';
import NoReviews from './NoReviews';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} showUrl={true} />
      <ListItemSeparator />
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useSingleRepository({ id, first: 10 });

  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  if (!repository) return <Spinner />;

  const handleEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ListItemSeparator}
      ListEmptyComponent={NoReviews}
      onEndReached={handleEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;

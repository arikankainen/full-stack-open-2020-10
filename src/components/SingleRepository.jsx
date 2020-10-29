import React from 'react';
import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useSingleRepository from '../hooks/useSingleRepository';
import Spinner from './Spinner';
import ListItemSeparator from './ListItemSeparator';
import Text from './Text';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} showUrl={true} />
      <ListItemSeparator />
    </View>
  );
};

const EmptyList = () => {
  return (
    <View>
      <Text align="center">No reviews</Text>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository } = useSingleRepository(id);

  const reviews = repository ? repository.reviews.edges.map(edge => edge.node) : [];

  if (!repository) return <Spinner />;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ListItemSeparator}
      ListEmptyComponent={EmptyList}
    />
  );
};

export default SingleRepository;

import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ListItemSeparator from './ListItemSeparator';

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

  const openRepository = id => {
    history.push(`/repository/${id}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openRepository(item.id)}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ListItemSeparator}
      renderItem={renderItem}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;

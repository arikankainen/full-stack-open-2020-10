import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ListItemSeparator from './ListItemSeparator';
import RepositorySortPicker, { repositorySort } from './RepositorySortPicker';

export const RepositoryListContainer = ({ repositories, onSortChanged, sort }) => {
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
      ListHeaderComponent={() => (
        <RepositorySortPicker value={sort} onValueChange={onSortChanged} />
      )}
    />
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState(repositorySort.LATEST.value);
  const { repositories } = useRepositories(sort);

  const handleSortChanged = value => {
    if (!value) setSort(repositorySort.LATEST.value);
    else setSort(value);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onSortChanged={handleSortChanged}
      sort={sort}
    />
  );
};

export default RepositoryList;

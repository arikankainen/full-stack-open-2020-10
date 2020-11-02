import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import ListItemSeparator from './ListItemSeparator';
import RepositorySortPicker, { repositorySort } from './RepositorySortPicker';
import RepositorySearch from './RepositorySearch';

export class RepositoryListContainer extends React.Component {
  openRepository = id => {
    const { history } = this.props;
    history.push(`/repository/${id}`);
  };

  renderHeader = () => {
    const { search, onSearchChanged, sort, onSortChanged } = this.props;
    return (
      <>
        <RepositorySearch value={search} onChangeText={onSearchChanged} />
        <RepositorySortPicker value={sort} onValueChange={onSortChanged} />
      </>
    );
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.openRepository(item.id)}>
        <RepositoryItem item={item} />
      </TouchableOpacity>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryListContainerWithRouter = withRouter(RepositoryListContainer);

const RepositoryList = () => {
  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 500);
  const [sort, setSort] = useState(repositorySort.LATEST.value);
  const { repositories, fetchMore } = useRepositories({ search: searchDebounced, sort, first: 10 });

  const handleSearchChanged = value => {
    setSearch(value);
  };

  const handleSortChanged = value => {
    if (!value) setSort(repositorySort.LATEST.value);
    else setSort(value);
  };

  const handleEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainerWithRouter
      repositories={repositories}
      onEndReach={handleEndReach}
      onSearchChanged={handleSearchChanged}
      search={search}
      onSortChanged={handleSortChanged}
      sort={sort}
    />
  );
};

export default RepositoryList;

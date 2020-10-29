import React from 'react';
import { View } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Spinner from './Spinner';

export const RepositoryContainer = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} showUrl={true} />
    </View>
  );
};

const Repository = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if (!repository) return <Spinner />;
  return <RepositoryContainer repository={repository} />;
};

export default Repository;

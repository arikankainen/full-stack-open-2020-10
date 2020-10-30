import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export const repositorySort = {
  LATEST: {
    label: 'Latest repositories',
    value: 'latest',
  },
  HIGHEST_RATED: {
    label: 'Highest rated repositories',
    value: 'highestRated',
  },
  LOWEST_RATED: {
    label: 'Lowest rated repositories',
    value: 'lowestRated',
  },
};

const items = Object.values(repositorySort);

const RepositorySortPicker = ({ onValueChange, value }) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect items={items} onValueChange={onValueChange} value={value} />
    </View>
  );
};

export default RepositorySortPicker;

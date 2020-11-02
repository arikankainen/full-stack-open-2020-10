import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 0,
  },
});

const RepositorySearch = ({ onChangeText, value }) => {
  return (
    <View style={styles.container}>
      <Searchbar placeholder="Search" onChangeText={onChangeText} value={value} />
    </View>
  );
};

export default RepositorySearch;

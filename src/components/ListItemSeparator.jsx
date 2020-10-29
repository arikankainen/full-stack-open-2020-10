import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ListItemSeparator = () => <View style={styles.separator} />;

export default ListItemSeparator;

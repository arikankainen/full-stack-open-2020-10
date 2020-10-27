import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  text: {
    color: 'white',
  },
});

const Button = ({ text, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text fontWeight="bold" style={styles.text}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Button;

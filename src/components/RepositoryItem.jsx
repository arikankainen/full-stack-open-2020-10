import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import truncateThousands from '../utils/truncateThousands';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    backgroundColor: 'white',
  },
  imageAndInfoContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexShrink: 1,
    marginLeft: 20,
  },
  countsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  countContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  topicText: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  languageContainer: {
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  languageText: {
    color: '#fff',
    fontSize: 16,
  },
});

const CountBox = ({ number, text }) => {
  return (
    <View style={styles.countContainer}>
      <Text testID={text} style={styles.topicText}>
        {truncateThousands(number)}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

const LanguageBox = ({ language }) => {
  return (
    <View style={styles.languageContainer}>
      <Text testID="language" style={styles.languageText}>
        {language}
      </Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageAndInfoContainer}>
        <View>
          <Image
            testID="avatarImage"
            style={styles.avatarImage}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text testID="fullName" style={styles.topicText}>
            {item.fullName}
          </Text>
          <Text testID="description">{item.description}</Text>
          <LanguageBox language={item.language} />
        </View>
      </View>

      <View style={styles.countsContainer}>
        <CountBox text="Stars" number={item.stargazersCount} />
        <CountBox text="Forks" number={item.forksCount} />
        <CountBox text="Reviews" number={item.reviewCount} />
        <CountBox text="Rating" number={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;

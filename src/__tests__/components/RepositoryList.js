import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';
import truncateThousands from '../../utils/truncateThousands';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const fullNames = getAllByTestId('fullName');
      const descriptions = getAllByTestId('description');
      const languages = getAllByTestId('language');
      const stargazersCounts = getAllByTestId('Stars');
      const forksCounts = getAllByTestId('Forks');
      const reviewCounts = getAllByTestId('Reviews');
      const ratingAverages = getAllByTestId('Rating');

      const repositioriesLength = repositories.edges.length;

      expect(fullNames).toHaveLength(repositioriesLength);
      expect(descriptions).toHaveLength(repositioriesLength);
      expect(languages).toHaveLength(repositioriesLength);
      expect(stargazersCounts).toHaveLength(repositioriesLength);
      expect(forksCounts).toHaveLength(repositioriesLength);
      expect(reviewCounts).toHaveLength(repositioriesLength);
      expect(ratingAverages).toHaveLength(repositioriesLength);

      repositories.edges.forEach((edge, index) => {
        expect(fullNames[index]).toHaveTextContent(edge.node.fullName);
        expect(descriptions[index]).toHaveTextContent(edge.node.description);
        expect(languages[index]).toHaveTextContent(edge.node.language);
        expect(stargazersCounts[index]).toHaveTextContent(
          truncateThousands(edge.node.stargazersCount)
        );
        expect(forksCounts[index]).toHaveTextContent(truncateThousands(edge.node.forksCount));
        expect(reviewCounts[index]).toHaveTextContent(truncateThousands(edge.node.reviewCount));
        expect(ratingAverages[index]).toHaveTextContent(truncateThousands(edge.node.ratingAverage));
      });
    });
  });
});

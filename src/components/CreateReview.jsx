import React from 'react';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useCreateReview from '../hooks/useCreateReview';
import theme from '../theme';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  review: yup.string(),
});

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={theme.whiteContainerWithShadow}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" placeholder="Review" multiline />
      <Button text="Create a review" onPress={onSubmit} />
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();

  const onSubmit = async values => {
    const { ownerName, repositoryName, rating, review } = values;
    const { data } = await createReview({ ownerName, repositoryName, rating: +rating, review });

    if (data && data.createReview) {
      const id = data.createReview.repositoryId;
      history.push(`/repository/${id}`);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;

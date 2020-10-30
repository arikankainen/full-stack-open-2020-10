import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be at least 1 character')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 character')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Passwords must match')
    .oneOf([yup.ref('password'), ''], 'Passwords must match'),
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={theme.whiteContainerWithShadow}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Button text="Sign up" onPress={onSubmit} />
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const history = useHistory();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;
    const { data } = await signUp({ username, password });

    if (data && data.createUser) {
      await signIn({ username, password });
      history.push('/');
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

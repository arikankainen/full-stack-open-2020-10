import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={theme.whiteContainerWithShadow}>
      <FormikTextInput testID="usernameField" name="username" placeholder="Username" />
      <FormikTextInput
        testID="passwordField"
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Button testID="submitButton" text="Sign in" onPress={onSubmit} />
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async values => {
    const { username, password } = values;

    await signIn({ username, password });
    history.push('/');
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;

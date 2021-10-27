import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/userAuthContext';
import Form from '../UI/Form/Form';
import { signin } from '../../utils/processData';
import { signInInitialValues, signInValidate, signInFields } from '../../utils/constants';
import Modal from '../UI/Modal/Modal';

const SignIn = () => {
  const { setLogedIn } = useContext(AuthContext);
  const [success, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const hist = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await signin(values);
      if (response.status === 200) {
        setLogedIn(true);
        setSucces('You are successfully loged in');
      } else {
        setError('Something went wrong...');
      }
    } catch {
      setError('Something went wrong...');
    }
  };

  return (
    <>
      <Form
        initialValues={signInInitialValues}
        handleSubmit={handleSubmit}
        validate={signInValidate}
        fields={signInFields}
      />
      {success && (
      <Modal
        message={success}
        setMessage={setSucces}
        successAction={() => {
          hist.goBack();
        }}
      />
      )}
      {error && <Modal message={error} setMessage={setError} />}
    </>
  );
};

export default SignIn;

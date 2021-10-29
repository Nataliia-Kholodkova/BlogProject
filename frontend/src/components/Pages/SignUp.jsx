import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import { signup } from '../../utils/processData';
import { signUpFields, signUpValidate, signUpInitialValues } from '../../utils/constants';

const SignUp = () => {
  const [success, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const hist = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await signup(values);
      if (response.status === 200) {
        setSucces('Sign up successfully');
      } else {
        setError('Something went wrong');
      }
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <>
      <Form
        initialValues={signUpInitialValues}
        handleSubmit={handleSubmit}
        validate={signUpValidate}
        fields={signUpFields}
        withSelect
      />
      {success && (
      <Modal
        setShowModal={setSucces}
        successAction={() => {
          hist.push('/signin');
        }}
        isSuccess
      >
        <h1>{success}</h1>

      </Modal>
      )}
      {error && <Modal setShowModal={setError} isError><h1>{error}</h1></Modal>}
    </>
  );
};

export default SignUp;

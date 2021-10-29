import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import { signin } from '../../utils/processData';
import { signInInitialValues, signInValidate, signInFields } from '../../utils/constants';
import { AuthContext } from '../../context/userAuthContext';

const SignIn = () => {
  const { setLogedIn } = useContext(AuthContext);
  const [success, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const hist = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await signin(values);
      if (response.status === 200) {
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
        setShowModal={setSucces}
        successAction={() => {
          setLogedIn(true);
          hist.push('/posts');
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

export default SignIn;

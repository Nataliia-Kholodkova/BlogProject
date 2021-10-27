import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../UI/Form/Form';
import { updateMePassword } from '../../utils/processData';
import Modal from '../UI/Modal/Modal';
import { changePasswordFields, changePasswordInitialValues, changePasswordValidate } from '../../utils/constants';

const ChangePassword = () => {
  const [success, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const hist = useHistory();

  const handleSubmit = async (values) => {
    const { oldPassword, newPassword } = values;
    try {
      const response = await updateMePassword({ oldPassword, newPassword });
      if (response.status === 200) {
        setSucces('Password changed successfully');
      } else {
        setError('Invalid password');
      }
    } catch (e) {
      setError('Error. Check old password or try later');
    }
  };

  return (
    <>
      <Form
        initialValues={changePasswordInitialValues}
        handleSubmit={handleSubmit}
        validate={changePasswordValidate}
        fields={changePasswordFields}
      />
      {success && (
      <Modal
        message={success}
        setMessage={setSucces}
        successAction={() => {
          hist.push('/me');
        }}
      />
      )}
      {error && <Modal message={error} setMessage={setError} />}
    </>
  );
};

export default ChangePassword;

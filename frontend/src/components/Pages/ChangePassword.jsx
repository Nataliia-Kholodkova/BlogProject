import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import { updateMePassword } from '../../utils/processData';
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
        setShowModal={setSucces}
        successAction={() => {
          hist.push('/me');
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

export default ChangePassword;

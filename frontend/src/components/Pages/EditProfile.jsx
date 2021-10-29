/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Convert } from 'mongo-image-converter';
import { useHistory } from 'react-router-dom';
import Form from '../UI/Form/Form';
import Image from '../Common/Image/Image';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import avatarMale from '../../assets/avatar_male.png';
import avatarFemale from '../../assets/avatar_female.png';
import { updateMe, updateMePhoto, deleteMe } from '../../utils/processData';
import { AuthContext } from '../../context/userAuthContext';
import { editProfileFields } from '../../utils/constants';

const EditProfile = () => {
  const { currentUser, setCurrentUser, setLogedIn } = useContext(AuthContext);
  const [image, setImage] = useState(currentUser?.picture?.large ?? null);
  const [success, setSucces] = useState(null);
  const [error, setError] = useState(null);
  const hist = useHistory();
  const initialValues = {
    firstName: currentUser.firstName ?? '',
    lastName: currentUser.lastName ?? '',
    streetName: currentUser?.street?.name ?? '',
    streetNumber: currentUser?.street?.number ?? 1,
    city: currentUser.city ?? '',
    state: currentUser.state ?? '',
    country: currentUser.country ?? '',
    phone: currentUser.phone ?? '',
    cell: currentUser.cell ?? '',
  };

  const handleSubmit = async (values) => {
    const {
      firstName, lastName, city, state, country, phone, cell,
    } = values;
    const formData = {
      firstName,
      lastName,
      city,
      state,
      country,
      phone,
      cell,
      street: { name: values.streetName, number: values.number },
    };
    try {
      const response = await updateMe(formData);
      if (response.status === 200) {
        const user = await response.data.user;
        setCurrentUser(user);
        setSucces('Profile updated successfully');
      } else {
        const message = await response.data.message;
        setError(message);
      }
    } catch {
      setError('Something went wrong...');
    }
  };

  return (
    <div className="edit">
      <div className="editProfileImageContainer">
        <Image
          src={
            image
            ?? (currentUser.gender === 'female' ? avatarFemale : avatarMale)
          }
          alt={`${currentUser.firstName} ${currentUser.lastName}`}
          className="userImgBig"
        />
        <div className="buttonsGroup">
          <label className="editProfileImageLabel">
            <input
              type="file"
              className="visually-hidden"
              onChange={async (event) => {
                setImage(URL.createObjectURL(event.target.files[0]));
                let convertedImage;
                try {
                  convertedImage = await Convert(event.target.files[0]);
                } catch (e) {
                  return;
                }
                try {
                  const response = await updateMePhoto({ photo: convertedImage });
                  const { user } = await response.data;
                  setCurrentUser(user);
                } catch {
                  setError('Something went wrong...');
                }
              }}
            />
            <i className="fas fa-cloud-upload-alt fa-editProfile" />
          </label>
          <Button
            onClick={async () => {
              const response = await deleteMe();
              if (response.status === 200) {
                setLogedIn(false);
                setCurrentUser(null);
              }
            }}
            className="btnDeleteMe"
            type="button"
          >
            <i className="fas fa-user-times" />
          </Button>
        </div>
      </div>
      <Form
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        fields={editProfileFields}
        className="formInline"
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
    </div>
  );
};

export default EditProfile;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Convert } from 'mongo-image-converter';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';
import { updatePost, createPost } from '../../utils/processData';

const PostCreateUpdate = ({ currentPost, formClassName, setReset }) => {
  const hist = useHistory();
  const [image, setImage] = useState(currentPost?.image ?? null);
  const [success, setSucces] = useState(null);
  const [error, setError] = useState(null);

  const fields = [
    {
      name: 'text',
      type: 'text',
      placeholder: 'Text',
    },
    {
      name: 'tags',
      type: 'text',
      placeholder: 'Separate tags with a whitespace',
    },
  ];

  const initialValues = {
    text: currentPost?.text ?? '',
    tags: currentPost?.tags.join(' ') ?? '',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.text) {
      errors.email = 'Text required';
    }

    if (!values.tags) {
      errors.password = 'At least one tag required';
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    let convertedImage;
    try {
      convertedImage = await Convert(image);
    } catch (e) {
      console.warn(e);
    }
    const formData = { ...values, image: convertedImage };
    formData.tags = formData.tags.split(' ');
    try {
      if (currentPost) {
        await updatePost(currentPost._id, formData);
      } else {
        await createPost(formData);
      }
      setSucces('Success!');
      if (setReset) {
        setReset(true);
      }
    } catch {
      setError('Something went wrong...');
    }
  };

  return (
    <>
      <Form
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        validate={validate}
        fields={fields}
        withImage
        setImage={setImage}
        className={formClassName}
      />
      {success && (
      <Modal
        setShowModal={setSucces}
        successAction={() => {
          hist.push('/posts');
        }}
        isSuccess
      >
        <h1>{success}</h1>

      </Modal>
      )}
      {error && <Modal message={error} setMessage={setError} />}
    </>
  );
};

export default PostCreateUpdate;

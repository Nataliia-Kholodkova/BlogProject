import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Convert } from 'mongo-image-converter';
import { createPostActionCreator, updatePostActionCreator } from '../../redux/actionCreators/postsActionCreators';
import Form from '../UI/Form/Form';
import Modal from '../UI/Modal/Modal';

const PostCreateUpdate = ({
  posts,
  createPost,
  updatePost,
}) => {
  const { id } = useParams();
  const hist = useHistory();
  const currentPost = id ? posts.find((post) => post._id === id) : null;
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
      if (id) {
        await updatePost(id, formData);
      } else {
        await createPost(formData);
      }
      setSucces('Success!');
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

const mapDispatchToProps = (dispatch) => ({
  createPost: (data) => dispatch(createPostActionCreator(data)),
  updatePost: (id, data) => dispatch(updatePostActionCreator(id, data)),
});

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCreateUpdate);

import React from 'react';
import { useFormik } from 'formik';
import Input from './Input';
import styles from './Form.module.css';
import Button from '../Button/Button';

const Form = ({
  initialValues, handleSubmit, validate, fields, withSelect, withImage, setImage,
}) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <form
      className={styles.form}
      onSubmit={formik.handleSubmit}
    >
      {fields.map((field) => (
        <Input
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          value={formik.values[field.name]}
          touched={formik.touched[field.name]}
          errors={formik.errors[field.name]}
          className="inputForText"
          labelClassName="labelForText"
        />
      ))}
      {withSelect && (
      <select
        name="gender"
        onChange={formik.handleChange}
        touched={formik.touched.gender}
        errors={formik.errors.gender}
        value={formik.values.gender}
      >
        <option value="mail">Male</option>
        <option value="female">Female</option>
      </select>
      )}
      {withImage && (
        <input
          className={styles['custom-file-input']}
          type="file"
          name="image"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
      )}
      <Button className="btnGood" type="submit">Submit</Button>
    </form>
  );
};

export default Form;

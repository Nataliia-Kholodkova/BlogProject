/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import Input from './Input';
import styles from './Form.module.css';
import Button from '../Button/Button';

const Form = ({
  initialValues, handleSubmit, validate, fields, withSelect, withImage, setImage, className,
}) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm();
    },
  });
  return (
    <form
      className={className ? styles[className] : styles.form}
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
        <label className={styles.image}>
          <input
            className="visually-hidden"
            type="file"
            name="image"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          <i className={`fas fa-cloud-upload-alt ${styles.far}`} />
        </label>
      )}
      <Button className="btnGood" type="submit" disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Submit</Button>
    </form>
  );
};

export default Form;

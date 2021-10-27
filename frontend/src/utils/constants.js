export const changePasswordFields = [
  {
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Old Password',
  },
  {
    name: 'newPassword',
    type: 'password',
    placeholder: 'New Password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
  },
];
export const changePasswordInitialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const changePasswordValidate = (values) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = 'Old Password required';
  }

  if (!values.newPassword) {
    errors.newPassword = 'New Password Required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password Required';
  }

  if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = 'Passwords should match';
  }
  return errors;
};

export const editProfileFields = [
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
  },
  {
    name: 'streetName',
    type: 'text',
    placeholder: 'Street',
  },
  {
    name: 'streetNumber',
    type: 'number',
    placeholder: 'Number',
  },
  {
    name: 'city',
    type: 'text',
    placeholder: 'City',
  },
  {
    name: 'state',
    type: 'text',
    placeholder: 'State',
  },
  {
    name: 'country',
    type: 'text',
    placeholder: 'Country',
  },
  {
    name: 'phone',
    type: 'tel',
    placeholder: 'Phone',
  },
  {
    name: 'cell',
    type: 'tel',
    placeholder: 'Cell',
  },
];

export const signInFields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
];
export const signInInitialValues = {
  email: '',
  password: '',
};

export const signInValidate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password Required';
  }
  return errors;
};

export const signUpFields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
  },
];

export const signUpInitialValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  gender: 'male',
};

export const signUpValidate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password Required';
  }

  if (!values.firstName) {
    errors.firstName = 'FirstName required';
  }

  if (!values.lastName) {
    errors.lastName = 'LastName Required';
  }
  return errors;
};

import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required("Name is required"),

  email: Yup.string()
    .required("Email is required")
    .test('is-valid-email', 'Invalid email format', (value) => {
      // Regular expression to check for valid email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    }),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must be 8-16 characters,include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});  



const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must be 8-16 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required('Password is required')
}) 



const updateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .nullable(), // Makes the field optional

  email: Yup.string()
    .test('is-valid-email', 'Invalid email format', (value) => {
      if (!value) return true; // If no value is provided, skip validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(value);
    })
    .nullable(), // Makes the field optional

  oldPassword: Yup.string()
    .when('newPassword', {
      is: (newPassword) => !!newPassword, // Only required if newPassword is provided
      then: Yup.string().required('Old password is required when updating the password'),
    }),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "Password must be 8-16 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .when('newPassword', {
      is: (newPassword) => !!newPassword, // Only validate if newPassword is being updated
      then: Yup.string().required('New password is required when updating the password'),
    }),

  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "New password must be 8-16 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .nullable(), // Makes the field optional
});





export {
    signUpSchema , loginSchema , updateSchema
}
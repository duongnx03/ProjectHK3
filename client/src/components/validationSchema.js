import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .max(50)
        .matches(/^[a-zA-Z0-9]+$/, 'Username must only contain letters and numbers'),
    fullname: Yup.string()
        .required('Fullname is required')
        .matches(/^[a-zA-Z ]+$/, 'Fullname must only contain letters'),
    email: Yup.string()
        .required('Email is required')
        .email('Invalid email format.'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must have at least 6 characters.')
        .max(50)
        .matches(/^(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]+$/, 'Password must contain at least one special character.'),
    address: Yup.string()
        .required('Address is required')
        .matches(/^[a-zA-Z0-9 /,\\-]+$/, 'Address must only contain letters and numbers.'),
    phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d{10}$/, 'The phone number must have exactly 10 digits.'),
});

export default validationSchema;
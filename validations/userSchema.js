const yup = require('yup')

const userSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required')
        .min(3, 'Name should be at least 3 chars')
        .max(10, 'Name should be 10 chars at most')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
})

module.exports = userSchema

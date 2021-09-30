const yup = require('yup')

const userSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required()
})

module.exports = userSchema

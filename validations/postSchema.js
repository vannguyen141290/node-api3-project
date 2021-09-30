const yup = require('yup')

const postSchema = yup.object().shape({
    text: yup
        .string()
        .trim()
        .required('missing required text field')
})

module.exports = postSchema

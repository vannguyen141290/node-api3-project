const Users = require('../users/users-model')
const userSchema = require('../../validations/userSchema')
const postSchema = require('../../validations/postSchema')

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.originalUrl}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      req.user = user
      next()
    } else {
      next({
        status: 404,
        message: "user not found"
      })
    }
  } catch (error) {
    next(error)
  }
}

async function validateUser(req, res, next) {
  try {
    const validated = await userSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    res.status(400).json({
      message: "missing required name field"
    })
  }
}

async function validatePost(req, res, next) {
  try {
    const validated = await postSchema.validate(
      req.body,
      { strict: false, stripUnknown: true }
    )
    req.body = validated
    next()
  } catch (err) {
    res.status(400).json({
      message: "missing required text field"
    })
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

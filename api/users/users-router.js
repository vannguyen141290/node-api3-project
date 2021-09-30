const express = require('express')
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware')
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
})

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
})

router.put(
  '/:id',
  validateUserId,
  validateUser,
  (req, res, next) => {
    Users.update(req.params.id, req.body)
      .then(user => {
        res.status(200).json(user)
      })
      .catch(next)
  })

router.delete(
  '/:id',
  validateUserId,
  async (req, res, next) => {
    try {
      const deletedUser = await Users.getById(req.params.id)
      await Users.remove(req.params.id)
      res.status(200).json(deletedUser)
    } catch (error) {
      next(error)
    }
  })

router.get(
  '/:id/posts',
  validateUserId,
  (req, res, next) => {
    Users.getUserPosts(req.params.id)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(next)
  })

router.post(
  '/:id/posts',
  validateUserId,
  validatePost,
  (req, res, next) => {
    Posts.insert({
      text: req.body.text,
      user_id: req.params.id
    })
      .then(post => {
        res.status(201).json(post)
      })
      .catch(next)
  })

module.exports = router

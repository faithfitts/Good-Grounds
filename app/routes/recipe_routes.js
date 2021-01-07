// Require Express
const express = require('express')

// Require Passport
const passport = require('passport')

// Require Mongoose
const Recipe = require('../models/recipe')

// Require methods for when we throw a custom error
const customErrors = require('../../lib/custom_errors')

// Function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// Send 401 when a user tries to modify someone elses resource
const requireOwnership = customErrors.requireOwnership

// Middleware that will remove blank fields from `req.body`
const removeBlanks = require('../../lib/remove_blank_fields')

// Pass in token
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router
const router = express.Router()

// INDEX
// GET /recipes
router.get('/recipes', requireToken, (req, res, next) => {
  // Find the recipes (only for current user)
  Recipe.find({owner: req.user._id})
    .then(recipes => {
      return recipes.map(recipe => recipe.toObject())
    })
    .then(recipes => res.status(200).json({ recipes: recipes }))
    .catch(next)
})

// INDEX ALL
// GET /all recipes
router.get('/recipes/all', requireToken, (req, res, next) => {
  // Find all recipes (by all users)
  Recipe.find()
    .then(recipes => {
      // Use `.map()` to apply `.toObject()` to each recipe (converts each one to POJO)
      return recipes.map(recipe => recipe.toObject())
    })
    .then(recipes => res.status(200).json({ recipes: recipes }))
    .catch(next)
})

// SHOW
// GET /recipes/:id
router.get('/recipes/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Recipe.findById(req.params.id)
    .then(handle404)
    .then(recipe => res.status(200).json({ recipe: recipe.toObject() }))
    .catch(next)
})

// CREATE
// POST /recipes
router.post('/recipes', requireToken, (req, res, next) => {
  // set owner of recipe to be current user
  req.body.recipe.owner = req.user.id

  // Create a recipe using the request's data (req.body)
  Recipe.create(req.body.recipe)
    .then(recipe => {
      res.status(201).json({ recipe: recipe.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /recipes/:id
router.patch('/recipes/:id', requireToken, removeBlanks, (req, res, next) => {
  // prevent a client from changing the owner
  delete req.body.recipe.owner

  // Find the recipe using the ID
  Recipe.findById(req.params.id)
    .then(handle404)
    .then(recipe => {
      // throw an error if the current user isn't the owner
      requireOwnership(req, recipe)
      // pass the result of Mongoose's `.update` to the next `.then`
      return recipe.updateOne(req.body.recipe)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /recipes/:id
router.delete('/recipes/:id', requireToken, (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(handle404)
    .then(recipe => {
      // throw an error if current user doesn't own `recipe`
      requireOwnership(req, recipe)
      // delete the recipe ONLY IF the above didn't throw
      recipe.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router

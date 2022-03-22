const router = require('express').Router()

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/create', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find()
    res.render('movies/new-movie', { celebrities })
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    await Movie.create(req.body)
    res.redirect(`${req.baseUrl}`)
  } catch (error) {
    console.log(error)
    res.redirect(`${req.baseUrl}/create`)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.find().populate('cast')
    res.render('movies/movies', { movies })
  } catch (error) {
    next(error)
  }
})

module.exports = router

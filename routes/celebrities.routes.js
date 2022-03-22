const router = require('express').Router()

const Celebrity = require('../models/Celebrity.model')

router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res, next) => {
  try {
    await Celebrity.create(req.body)
    res.redirect(`${req.baseUrl}`)
  } catch (error) {
    console.log(error)
    res.redirect(`${req.baseUrl}/create`)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find()
    res.render('celebrities/celebrities', { celebrities })
  } catch (error) {
    next(error)
  }
})

module.exports = router

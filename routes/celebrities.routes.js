const router = require('express').Router()

const Celebrity = require('../models/Celebrity.model')

router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res, next) => {
  try {
    await Celebrity.create(req.body)
    res.redirect('/')
  } catch (error) {
    console.log(error)
    res.redirect('/create')
  }
})

module.exports = router

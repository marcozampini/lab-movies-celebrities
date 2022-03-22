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
router.get('/:id', async (req, res, next) => {
  try {
    const celebrity = await Celebrity.findById(req.params.id)
    res.render('celebrities/celebrity-details', { celebrity })
  } catch (error) {
    console.log(error)
    res.redirect(`${req.baseUrl}`)
  }
})
router.post('/:id/delete', async (req, res, next) => {
  try {
    const celebrity = await Celebrity.findByIdAndDelete(req.params.id)
    res.redirect(`${req.baseUrl}`)
  } catch (error) {
    console.log(error)
    res.redirect(`${req.baseUrl}`)
  }
})
router.get('/:id/edit', async (req, res, next) => {
  try {
    const celebrity = await Celebrity.findById(req.params.id)
    res.render('celebrities/edit-celebrity', { celebrity })
  } catch (error) {
    next(error)
  }
})
router.post('/:id/edit', async (req, res, next) => {
  try {
    const celebrity = await Celebrity.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`${req.baseUrl}`)
  } catch (error) {
    console.log(error)
    res.redirect(`${req.baseUrl}`)
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

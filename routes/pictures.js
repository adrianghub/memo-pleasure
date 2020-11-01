const express = require("express");
const router = express.Router();

const Location = require("../models/location");
const Picture = require("../models/picture");
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'images/gif']

// all pics
router.get("/", async (req, res) => {
  let query = Picture.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  if (req.query.tookBefore != null && req.query.tookBefore != '') {
    query = query.lte('tookDate', req.query.tookBefore)
  }
  if (req.query.tookAfter != null && req.query.tookAfter != '') {
    query = query.gte('tookDate', req.query.tookAfter)
  }
  try {
    const pictures = await query.exec()
    res.render('pictures/index', {
      pictures: pictures,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
});

// new pic
router.get("/new", async (req, res) => {
  renderNewPage(res, new Picture())
});

// add new pic
router.post("/", async (req, res) => {
  const picture = new Picture({
    title: req.body.title,
    location: req.body.location,
    tookDate: new Date(req.body.tookDate),
    yearsOld: req.body.yearsOld,
    description: req.body.description
  })
  saveImage(picture, req.body.image)

  try {
    const newPicture = await picture.save()
    // res.redirect(`pictures/${newPicture.id}`)
    res.redirect('pictures') 
  } catch {
    renderNewPage(res, picture, true)
  }
});

// view pic
router.get('/:id', async(req, res) => {
  try {
    const picture = await Picture.findById(req.params.id).populate('location').exec()
    res.render('pictures/show', { picture: picture })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// edit pic
router.get("/:id/edit", async(req, res) => {
  try {
    const picture = await Picture.findById(req.params.id)
    renderEditPage(res, picture)
  } catch {
    res.redirect('/')
  }
})

// update pic
router.put("/:id", async(req, res) => {
  try {
    res.send(`Update: ${req.params.id}`)
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// delete pic
router.delete("/:id/", async(req, res) => {
  try {
    res.send(`Delete: ${req.params.id}`)
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

async function renderNewPage(res, picture, hasError = false) {
  renderPageTemplate(res, picture, 'new', hasError)
}

async function renderEditPage(res, picture, hasError = false) {
  renderPageTemplate(res, picture, 'edit', hasError)
}

async function renderPageTemplate(res, picture, template, hasError = false) {
  try {
    const locations = await Location.find({})
    const params = {
      locations: locations,
      picture: picture
    }
    if (hasError) params.errorMessage = 'Error occurred while adding new picture'
    res.render(`pictures/${template}`, params)
  } catch {
    res.redirect('pictures/')
  }
}

function saveImage(picture, imageEncoded) {
  if (imageEncoded == null) return
  const image = JSON.parse(imageEncoded)
  if (image != null && imageMimeTypes.includes(image.type)) {
    picture.image = new Buffer.from(image.data, 'base64')
    picture.imageType = image.type
  }
}

module.exports = router;

const express = require("express");
const router = express.Router();

const Location = require("../models/location");
const Picture = require("../models/picture");

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

  try {
    const newPicture = await picture.save()
    // res.redirect(`pictures/${newPicture.id}`)
    res.redirect('pictures') 
  } catch {
    renderNewPage(res, picture, true)
  }
});

async function renderNewPage(res, picture, hasError = false) {
  try {
    const locations = await Location.find({})
    const params = {
      locations: locations,
      picture: picture
    }
    if (hasError) params.errorMessage = 'Error occurred while adding new picture'
    res.render('pictures/new', params)
  } catch {
    res.redirect('/pictures')
  }
}

module.exports = router;

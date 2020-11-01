const express = require("express");
const router = express.Router();

const Location = require("../models/location");

// all locations
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.country !== null && req.query.country !== "") {
    searchOptions.country = new RegExp(req.query.country, "i");
  }
  try {
    const locations = await Location.find(searchOptions);
    res.render("locations/index", {
      locations: locations,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// new location
router.get("/new", (req, res) => {
  res.render("locations/new", { location: new Location() });
});

// add new location
router.post("/", async (req, res) => {
  const location = new Location({
    country: req.body.country,
  });
  try {
    const newLocation = await location.save();
    res.redirect(`/locations/${newLocation.id}`)
  } catch (err) {
    res.render("locations/new", {
      location: location,
      errMessage: `Error happend: ${err}`,
    });
  }
});

// view route
router.get("/:id", (req, res) => {
  res.send(`Show Location ${req.params.id}`)
})

// edit route
router.get("/:id/edit", async (req, res) => {

  try {
    const location = await Location.findById(req.params.id)
    res.render('locations/edit', { location: location })
  } catch {
    res.redirect('/locations')
  }
})

// update route
router.put("/:id", async (req, res) => {
  let location
  try {
    location = await Location.findById(req.params.id); 
    location.country = req.body.country
    const newLocation = await location.save();
    res.redirect(`/locations/${newLocation.id}`)
  } catch (err) {
    if (location == null) {
      res.redirect('/')
    } else {
      res.render("locations/edit", {
        location: location,
        errMessage: `Error happend: ${err}`,
      });
    }
  }
})

// delete route
router.delete("/:id", async (req, res) => {
  let location
  try {
    location = await Location.findById(req.params.id)
    await location.remove()
    res.redirect("/locations")
  } catch (err) {
    if (location == null) {
      res.redirect('/')
    } else {
      res.redirect(`/locations/${location.id}`)
    }
  }
})

module.exports = router;

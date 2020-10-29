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
    // res.redirect('authors/${newLocation.id}')
    res.redirect("locations");
  } catch (err) {
    res.render("locations/new", {
      location: location,
      errMessage: `Error happend: ${err}`,
    });
  }
});

module.exports = router;

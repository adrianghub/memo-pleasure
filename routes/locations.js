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

router.get("/:id", (req, res) => {
  res.send(`Show Location ${req.params.id}`)
})

router.get("/:id/edit", (req, res) => {
  res.send(`Edit Location ${req.params.id}`)
})

router.put("/:id", (req, res) => {
  res.send(`Update Location ${req.params.id}`)
})

router.delete("/:id", (req, res) => {
  res.send(`Delete Location ${req.params.id}`)
})

module.exports = router;

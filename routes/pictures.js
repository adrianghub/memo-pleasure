const express = require("express");
const router = express.Router();

const Picture = require("../models/picture");

// all pics
router.get("/", async (req, res) => {
  res.send('All Pics')
});

// new pic
router.get("/new", (req, res) => {
  res.send("New pic")
});

// add new pic
router.post("/", async (req, res) => {
  res.send("Add Pic")
});

module.exports = router;

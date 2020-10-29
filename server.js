if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

// imports
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser')

const indexRouter = require("./routes/index");
const locationRouter = require('./routes/locations')

// express setup
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// connection to mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('Successfully connected to mongoose'))

// routes
app.use("/", indexRouter);
app.use("/locations", locationRouter)

app.listen(process.env.PORT || 3000);

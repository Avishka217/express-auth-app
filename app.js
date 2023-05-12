const express = require("express");
const app = express();
const router = require("express-router");
const cookieparser = require("cookie-parser");
const express_session = require("express-session");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const viewengine = require("view-engine");
const mongoose = require("mongoose");
const passport = require("passport");

const database =
  "mongodb+srv://db1:db1_user@cluster0.vbkmidt.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("e don connect"))
  .catch((err) => console.log(err));

dotenv.config();
app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cookieparser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  express_session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


const indexRouter = require("./routes/index.js");
app.use("/", indexRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));

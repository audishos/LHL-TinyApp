// express_server.js
"use strict";
// declare requirements
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const generateRandom = require("./generateRandom.js");
const urlsDB = require("./urlsDB.js");
const usersDB = require("./usersDB.js");
const analyticsDB = require("./analyticsDB.js");

// declare constants
const PORT = process.env.PORT || 8080; // default port 8080
const SHORTLEN = 6; // length of short URL string
const USERIDLEN = 6; // length of user ID string
const VISITORIDLEN = 6; // length of visitor ID string

// middleware - checks if a user is logged in
function checkUser(req, res, next) {
  const whiteList = ["/login", "/register"]; // don't need to be logged in for these routes

  if (whiteList.indexOf(req.path) > -1 || req.path.startsWith("/u/")) {
    next();
    return;
  }

  // check for user_id cookie and verify the user exists
  if (req.session.user_id && usersDB.get(req.session.user_id)) {
    next();
    return;
  } else {
    req.session.user_id = null;
    res.redirect("/login");
    return;
  }
}

// setup express and requirements
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use("/styles",express.static(__dirname + "/styles"));
app.use("/images",express.static(__dirname + "/images"));
app.use(methodOverride("_method"));
app.use(cookieSession({
  name: "session",
  keys: [
    "b370de14e94142d4a108a79df6d0e265a0ba3fa2e10f57c4b3a892b74c9f84aa",
    "26cb941323ef3be96a33e7dec1a6e8e4a9075e3f55b4eb818a292c6ad368f0e9"
  ]
}));
app.use(morgan("dev"));
app.use(checkUser);

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlsDB);
});

// urls list page
app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlsDB.getByUserID(req.session.user_id),
    user: usersDB.get(req.session.user_id)
  };
  res.render("urls_index", templateVars);
});

// creating a new short url
app.post("/urls", (req, res) => {
  const newShortURL = generateRandom.string(SHORTLEN);
  if (urlsDB.add(newShortURL, {shortURL: newShortURL, url: req.body.longURL, userID: req.session.user_id})) {
    res.status(201);
    res.redirect(`/urls/${newShortURL}`);
  } else {
    res.status(500).send("500 - There was an error on our end. Oops! Please try again.");
  }
});

// new short url page
app.get("/urls/new", (req, res) => {
  let templateVars = { user: usersDB.get(req.session.user_id) };
  res.render("urls_new", templateVars);
});

// view/edit existing url page
app.get("/urls/:id", (req, res) => {
  // check that short url exists
  if (!urlsDB.get(req.params.id)) {
    res.status(404).send("404 - URL was not found.")
    return;
  }

  // check that url belong to current user
  if (urlsDB.get(req.params.id).userID !== req.session.user_id) {
    res.status(403).send("403 - You do not own this short URL!");
    return;
  }

  let templateVars = {
    url: urlsDB.get(req.params.id),
    user: usersDB.get(req.session.user_id),
    visitorCount: analyticsDB.getVisitorCount(req.params.id),
    analytics: analyticsDB.getAnalytics(req.params.id)
  };
  res.render("urls_show", templateVars);
});

// deleting a short url
app.delete("/urls/:id", (req, res) => {
  // check that url belongs to current user
  if (urlsDB.get(req.params.id).userID !== req.session.user_id) {
    res.status(403).send("403 - You do not own this short URL!");
    return;
  }

  if (urlsDB.delete(req.params.id)) {
    res.status(200);
    res.redirect("/urls");
  } else {
    res.status(404).send("404 - Could not remove item. Item was not found.");
  }
});

// editing a short url
app.put("/urls/:id", (req, res) => {
  // check that url belongs to the current user
  if (urlsDB.get(req.params.id).userID !== req.session.user_id) {
    res.status(403).send("403 - You do not own this short URL!");
    return;
  }

  if (urlsDB.edit(req.params.id, {shortURL: req.params.id, url: req.body.fullURL, userID: req.session.user_id})) {
    res.status(200);
    res.redirect("/urls");
  } else {
    res.status(404).send("404 - Could not modify item. Item was not found.");
  }
});

// directing user to the long url
app.get("/u/:shortURL", (req, res) => {
  // gets longURL based on ':shortURL' route and key in urlDatabase
  if (urlsDB.get(req.params.shortURL)) {
    if (!req.session.visitor_id) {
      req.session.visitor_id = generateRandom.string(VISITORIDLEN);
    }
    let now = new Date(Date.now());
    analyticsDB.add({
      timestamp: now,
      shortURL: req.params.shortURL,
      visitorID: req.session.visitor_id,
    });
    res.status(302);
    res.redirect(urlsDB.get(req.params.shortURL).url); // redirects the page to the longURL
  } else {
    res.status(404).send("404 - URL not found!");
  }
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/urls");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  if (req.body.email && req.body.password) {
    if (!usersDB.getByEmail(req.body.email)) {
      const userID = generateRandom.string(USERIDLEN);
      const user = {
        id: userID,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
      };
      if (usersDB.add(userID, user)) {
        res.status(201);
        req.session.user_id = userID;
        res.redirect("/urls");
      } else {
        res.status(500).send("500 - There was an error on our end. Oops! Please try again.");
      }
    } else {
      res.status(400).send("400 - Bad Request. Email is already registered.");
    }
  } else {
    res.status(400).send("400 - Bad Request. You must enter both an email and password.");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    const user = usersDB.getByEmail(req.body.email);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200);
        req.session.user_id = user.id;
        res.redirect("/urls");
      } else {
        res.status(401).send("401 - Login failed");
      }
    } else {
      res.status(404).send("404 - User not found.");
    }
  } else {
    res.status(400).send("400 - Bad Request. You must enter both an email and password.");
  }
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
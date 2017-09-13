const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const SHORTLEN = 6;

function generateRandomString(len) {
  let randString = "";
  const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < len; i++) {
    randString += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return randString;
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  const newShortURL = generateRandomString(SHORTLEN);
  urlDatabase[newShortURL] = req.body.longURL;
  res.redirect(`/urls/${newShortURL}`);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    fullURL: urlDatabase[req.params.id]
  };
  res.render("urls_show", templateVars);
});

app.delete("/urls/:id", (req, res) => {
  if (urlDatabase[req.params.id]) {
    delete urlDatabase[req.params.id];
    res.redirect("/urls");
  } else {
    res.status(404).send('404 - Could not remove item. Item was not found.');
  }
});

app.put("/urls/:id", (req, res) => {
  if (urlDatabase[req.params.id]) {
    urlDatabase[req.params.id] = req.body.fullURL;
    res.redirect("/urls");
  } else {
    res.status(404).send('404 - Could not modify item. Item was not found.');
  }
});

app.get("/u/:shortURL", (req, res) => {
  // gets longURL base on ':shortURL' route and key in urlDatabase
  if (urlDatabase[req.params.shortURL] !== undefined) {
    const longURL = urlDatabase[req.params.shortURL];
    res.status(302);
    res.redirect(longURL); // redirects the page to the longURL
  } else {
    res.status(404).send('404 - URL not found!');
  }
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
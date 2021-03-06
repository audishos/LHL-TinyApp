"use strict";
// our "database"
const urlDatabase = {
  "b2xVn2": {
    shortURL: "b2xVn2",
    url: "http://www.lighthouselabs.ca",
    userID: "userRandomID"
  },
  "hd92kd": {
    shortURL: "hd92kd",
    url: "https://www.reddit.com",
    userID: "userRandomID"
  },
  "H2nsH5": {
    shortURL: "H2nsH5",
    url: "https://inbox.google.com",
    userID: "userRandomID"
  },
  "HJS91A": {
    shortURL: "HJS91A",
    url: "https://www.netflix.com",
    userID: "userRandomID"
  },
  "9sm5xK": {
    shortURL: "9sm5xK",
    url: "http://www.google.com",
    userID: "user2RandomID"
  },
  getAll: function() {
    const urls = {};
    for (let key in this) {
      if (typeof this[key] !== "function") {
        urls[key] = this[key];
      }
    }
    return urls;
  },
  get: function(key) {
    if (this[key]) {
      return this[key];
    } else {
      return null;
    }
  },
  getByUserID: function(userID) {
    let urls = {};
    for (let key in this) {
      if (this[key].userID === userID) {
        urls[key] = this[key];
      }
    }
    return urls;
  },
  add: function(key, value) {
    if (!this[key] && value) {
      // convert url to lowercase
      value.url = value.url.toLowerCase();
      // add http:// to url if missing
      if (!value.url.match(/^[a-z]+:\/\//))
      {
        value.url = "http://" + value.url;
      }
      this[key] = value;
      return true;
    } else {
      return false;
    }
  },
  edit: function(key, value) {
    if (this[key] && value) {
      // convert url to lowercase
      value.url = value.url.toLowerCase();
      // add http:// to url if missing
      if (!value.url.match(/^[a-z]+:\/\//))
      {
        value.url = "http://" + value.url;
      }
      this[key] = value;
      return true;
    } else {
      return false;
    }
  },
  delete: function(key) {
    if (this[key]) {
      delete this[key];
      return true;
    } else {
      return false;
    }
  }
};

module.exports = urlDatabase;

// some tests
// console.log(urlDatabase.getAll());
// console.log(urlDatabase.get("b2xVn2"));
// console.log(urlDatabase.add("b2xVn3", {shortURL: "b2xVn3", url: "https://www.reddit.com", user: "batman"}));
// console.log(urlDatabase.edit("b2xVn2", {shortURL: "b2xVn2", url: "http://www.lhl.ca", user: "batman"}));
// console.log(urlDatabase.getAll());
// console.log(urlDatabase.delete("9sm5xK"));
// console.log(urlDatabase.getAll());
// console.log(urlDatabase.getByUserID("user2RandomID"));
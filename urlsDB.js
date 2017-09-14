// our "database"
const urlDatabase = {
  "b2xVn2": {
    shortURL: "b2xVn2",
    url: "http://www.lighthouselabs.ca",
    user: "userRandomID"
  },
  "9sm5xK": {
    shortURL: "9sm5xK",
    url: "http://www.google.com",
    user: "user2RandomID"
  },
  getAll: function() {
    const all = {};
    for (key in this) {
      if (typeof this[key] !== 'function') {
        all[key] = this[key];
      }
    }
    return all;
  },
  get: function(key) {
    if (this[key]) {
      return this[key];
    } else {
      return null;
    }
  },
  add: function(key, value) {
    if (!this[key] && value) {
      this[key] = value;
      return true;
    } else {
      return false;
    }
  },
  edit: function(key, value) {
    if (this[key] && value) {
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
// console.log(urlDatabase.add("b2xVn3", "https://www.reddit.com"));
// console.log(urlDatabase.edit("b2xVn2", "http://www.lhl.com"));
// console.log(urlDatabase.getAll());
// console.log(urlDatabase.delete("9sm5xK"));
// console.log(urlDatabase.getAll());
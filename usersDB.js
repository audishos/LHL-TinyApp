const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  },
  getAll: function() {
    const users = {};
    for (key in this) {
      if (typeof this[key] !== 'function') {
        users[key] = this[key];
      }
    }
    return users;
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
  },
  getByEmail: function(email) {
    let user = null;
    for (key in this) {
      if (this[key].email === email) {
        user = this[key];
      }
    }
    return user;
  }
}

module.exports = users;
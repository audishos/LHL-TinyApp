"use strict";
const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "$2a$06$LSZ1UKBosn6Vz70XO9hTfe9FDXwFo3TN6PQ6rFYVHbWXC6NpD7qkK"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "$2a$06$LSZ1UKBosn6Vz70XO9hTfe9FDXwFo3TN6PQ6rFYVHbWXC6NpD7qkK"
  },
  getAll: function() {
    const users = {};
    for (let key in this) {
      if (typeof this[key] !== "function") {
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
      // convert email to lowercase
      value.email = value.email.toLowerCase();
      this[key] = value;
      return true;
    } else {
      return false;
    }
  },
  edit: function(key, value) {
    if (this[key] && value) {
      // convert email to lowercase
      value.email = value.email.toLowerCase();
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
    for (let key in this) {
      if (this[key].email === email) {
        user = this[key];
      }
    }
    return user;
  }
};

module.exports = users;
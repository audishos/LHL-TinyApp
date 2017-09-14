"use strict";

const analytics = {
  1505428069628: {
    timestamp: 1505428069628,
    shortURL: "b2xVn2",
    visitorID: "ks93jd"
  },
  add: function(analytic) {
    this[Date.now()] = analytic;
  },
  getTotalVisitorCount: function(shortURL) {
    let visitorCount = 0;
    for (let key in this) {
      if (typeof this[key] !== "function" &&
          this[key].shortURL === shortURL) {
        visitorCount++;
      }
    }
    return visitorCount;
  },
  getUniqueVisitorCount: function(shortURL) {
    let visitorCount = 0;
    let foundVisitorIDs = [];
    for (let key in this) {
      if (typeof this[key] !== "function" &&
          this[key].shortURL === shortURL &&
          foundVisitorIDs.indexOf(this[key].visitorID) < 0) {
        visitorCount++;
        foundVisitorIDs.push(this[key].visitorID);
      }
    }
    return visitorCount;
  },
  getVisitorCount: function(shortURL) {
    let visitorCount = {
      total: 0,
      unique: 0
    };
    let foundVisitorIDs = [];
    for (let key in this) {
      if (typeof this[key] !== "function" &&
          this[key].shortURL === shortURL) {
        visitorCount.total++;
        if (foundVisitorIDs.indexOf(this[key].visitorID) < 0) {
          foundVisitorIDs.push(this[key].visitorID);
          visitorCount.unique++;
        }
      }
    }
    return visitorCount;
  }
};

module.exports = analytics;
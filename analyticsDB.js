"use strict";

const analytics = {
  1505428069628: {
    timestamp: new Date(1505428069628),
    shortURL: "b2xVn2",
    visitorID: "ks93jd"
  },
  1505438069628: {
    timestamp: new Date(1505438069628),
    shortURL: "b2xVn2",
    visitorID: "82nfdR"
  },
  1505448069628: {
    timestamp: new Date(1505448069628),
    shortURL: "b2xVn2",
    visitorID: "ks93jd"
  },
  1505458069628: {
    timestamp: new Date(1505458069628),
    shortURL: "b2xVn2",
    visitorID: "18HA8u"
  },
  1505468069628: {
    timestamp: new Date(1505628069628),
    shortURL: "b2xVn2",
    visitorID: "ks93jd"
  },
  1505478069628: {
    timestamp: new Date(1505478069628),
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
  },
  getAnalytics: function(shortURL) {
    let analytics = {};
    for (let key in this) {
      if (typeof this[key] !== "function" &&
        this[key].shortURL === shortURL) {
        analytics[key] = this[key];
      }
    }
    return analytics;
  }
};

module.exports = analytics;
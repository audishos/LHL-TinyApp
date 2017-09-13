// generateRandom.js
// function to generate a randome alphanumeric string
function string(len) {
  let randString = "";
  const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < len; i++) {
    randString += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return randString;
}

module.exports.string = string;
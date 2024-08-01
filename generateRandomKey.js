const crypto = require("crypto");

function generateRandomKey() {
  return crypto.randomBytes(32).toString("base64");
}

const randomKey = generateRandomKey();
console.log(randomKey);

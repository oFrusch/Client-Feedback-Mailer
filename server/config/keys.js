// determine what set of credentials to determine (dev or prod)
if (process.env.NODE_ENV === "production") {
  // return production keys
  module.exports = require("./prod");
} else {
  // return development keys
  module.exports = require("./dev");
}

const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

// create collection called "users" that is defined by the userSchema
mongoose.model("users", userSchema);

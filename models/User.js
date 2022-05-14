const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true, minlength: 5, maxlength: 55 },
    lastname: { type: String },
    password: { type: String, required: true, minlength: 8 },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.TOKEN_KEY
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;

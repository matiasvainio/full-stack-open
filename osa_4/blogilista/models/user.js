const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    // eslint-disable-next-line no-underscore-dangle
    returnableObject.id = object._id;
    // eslint-disable-next-line no-underscore-dangle
    // delete returnableObject._id;
    // eslint-disable-next-line no-underscore-dangle
    delete returnableObject.__v;
    delete returnableObject.passwordHash;
    return returnableObject;
  },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;

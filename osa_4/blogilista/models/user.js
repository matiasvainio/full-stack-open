const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});

userSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    // eslint-disable-next-line no-underscore-dangle
    returnableObject.id = object._id;
    // eslint-disable-next-line no-underscore-dangle
    delete returnableObject._id;
    // eslint-disable-next-line no-underscore-dangle
    delete returnableObject.__v;
    delete returnableObject.passwordHash;
    return returnableObject;
  },
});

module.exports = mongoose.model('User', userSchema);

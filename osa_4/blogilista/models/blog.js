const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (doc, object) => {
    const returnableObject = object;
    // eslint-disable-next-line no-underscore-dangle
    returnableObject.id = object._id.toString();
    // eslint-disable-next-line no-underscore-dangle
    delete returnableObject._id;
    // eslint-disable-next-line no-underscore-dangle
    delete returnableObject.__v;
    return returnableObject;
  },
});

module.exports = mongoose.model('Blog', blogSchema);

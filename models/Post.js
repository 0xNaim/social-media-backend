const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    image: String,
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model('Post', postSchema);

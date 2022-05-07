const Post = require('../models/Post');
const User = require('../models/User');
User;

// Create a post
const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return res.status(201).json(savedPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json({ message: 'Post not found!' });

    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      return res.status(200).json({ message: 'Post updated successfully!' });
    }
    return res.status(403).json({ message: 'You can update only your post!' });
  } catch (err) {
    return req.status(500).json({ message: err.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    !post && res.status(404).json({ message: 'Post not found!' });

    if (post.userId === req.body.userId) {
      await Post.deleteOne();
      return res.status(200).json({ message: 'Post deleted successfully!' });
    }
    return res.status(403).json({ message: 'You can delete only your post!' });
  } catch (err) {
    return req.status(500).json({ message: err.message });
  }
};

// Like and dislike a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: [req.body.userId] } });
      return res.status(200).json({ message: 'Post liked!' });
    }
    await post.updateOne({ $pull: { likes: [req.body.userId] } });
    return res.status(200).json({ message: 'Post disliked!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Find a post
const findSinglePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    !post && res.status(404).json({ message: 'Post not found!' });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// Get timeline post
const getTimelinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendsPosts));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  findSinglePost,
  getTimelinePosts,
};

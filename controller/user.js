const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Update user
const updateUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json({ message: err.message });
        }
      }

      // Update the user
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        !user && res.status(404).json({ message: 'User not found!' });

        return res.status(200).json({ message: 'User updated successfully!' });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
    return res
      .status(403)
      .json({ message: 'You can update only your account!' });
  } catch (err) {
    return res
      .status(403)
      .json({ message: 'You can update only your account!' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      // Update the user
      try {
        const user = await User.findById({ _id: req.params.id });
        !user && res.status(404).json({ message: 'User not found!' });

        await User.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'User deleted successfully!' });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
    return res
      .status(403)
      .json({ message: 'You can delete only your account!' });
  } catch (err) {
    return res
      .status(403)
      .json({ message: 'You can delete only your account!' });
  }
};

// Get a user
const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    !user && res.status(404).json({ message: 'User not found!' });
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// Follow a user
const followUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({
            $push: { followings: req.params.id },
          });

          return res.status(200).json({ message: 'User has been followed!' });
        }

        return res
          .status(403)
          .json({ message: 'You all ready follow this user!' });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
    return res.status(403).json({ message: "You can't follow yourself!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Unfollow a user
const unfollowUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({
            $pull: { followings: req.params.id },
          });

          return res.status(200).json({ message: 'User has been unfollowed!' });
        }

        return res.status(403).json({ message: "You don't follow this user!" });
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
    return res.status(403).json({ message: "You can't unfollow yourself!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
};

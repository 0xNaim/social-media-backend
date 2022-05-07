const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unfollowUser,
} = require('../controller/user');
const router = require('express').Router();

// Update user
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

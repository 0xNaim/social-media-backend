const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  findSinglePost,
  getTimelinePosts,
} = require('../controller/post');

const router = require('express').Router();

// Posts route
router.get('/timeline/all', getTimelinePosts);
router.put('/:id/like', likePost);
router.get('/:id', findSinglePost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/', createPost);

module.exports = router;

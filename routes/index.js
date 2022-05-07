const router = require('express').Router();
const userRoute = require('./user');
const authRoute = require('./auth');
const postRoute = require('./posts');

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/users', userRoute);
router.use('/api/v1/posts', postRoute);

module.exports = router;

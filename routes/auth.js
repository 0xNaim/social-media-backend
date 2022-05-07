const { registerController, loginController } = require('../controller/auth');
const router = require('express').Router();

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;

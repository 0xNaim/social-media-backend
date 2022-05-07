const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register user
const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user and return response
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Login user
const loginController = async (req, res) => {
  try {
    // Check user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json({ message: 'Invalid credentials!' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json({ message: 'Invalid credentials!' });

    const { password, ...other } = user._doc;

    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerController,
  loginController,
};

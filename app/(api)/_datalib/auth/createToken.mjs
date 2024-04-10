const jwt = require('jsonwebtoken');
const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "1800s" })

        return res
          .status(200)
          .json({ message: "User Logged in Successfully", token });
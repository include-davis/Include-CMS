const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "24hrs" })
        return res
          .status(200)
          .json({ message: "User Logged in Successfully", token });
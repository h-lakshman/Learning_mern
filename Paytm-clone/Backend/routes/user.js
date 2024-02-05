require('dotenv').config();
const express = require('express');
const { userSchema, signinBody, updateBody } = require('../types');
const { User, Account } = require('../db');
const authMiddleware = require('../middlewares/auth')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const createPayload = req.body;
  const { success } = userSchema.safeParse(createPayload);
  if (!success) {
    return res.status(411).json({
      message: "You've sent the wrong inputs",
    });
  }

  const userExists = await User.findOne({
    username: createPayload.username,
  });
  if (userExists) {
    return res.status(409).json({
      message: 'User with this email already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(createPayload.password, 10);
  const newUser = await User.create({
    username: createPayload.username,
    firstName: createPayload.firstName,
    lastName: createPayload.lastName,
    password: hashedPassword,
  });

  const userId = newUser._id

  const account = await Account.create({
    userId,
    balance: Math.random() * 1000
  })

  console.log(account)
  const jwtToken = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN);

  return res.status(201).json({
    message: 'User created successfully',
    token: jwtToken,
  });
});

router.post('/signin', async (req, res) => {
  const { success } = signinBody.safeParse(req.body)
  if (!success)
    return res.status(411).json({
      message: 'Incorrect inputs'
    })

  const user = await User.findOne({
    username: req.body.username,
  })

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

  if (User) {
    const token = jwt.sign({
      userId: user._id
    }, process.env.JWT_TOKEN)
    res.json({
      token,
    })
    return;
  }

  res.status(411).json({
    message: 'Error while logging in '
  })
})

router.put('/', authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body)
  if (!success) return res.status(411).json({ message: "Password is too small/firstName and lastName should be less than 50 characters" })
  const user = await User.findOne({
    _id: req.userId
  })

  if (req.body.password) {
    const newPassword = await bcrypt.hash(req.body.password, 10)
    user.password = newPassword
  }
  if (req.body.firstName) user.firstName = req.body.firstName
  if (req.body.lastName) user.lastName = req.body.lastName

  await user.save()

  return res.status(200).json({
    message: "updated successfully"
  })

});


router.get('/bulk', async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{
      firstName: {
        "$regex": filter
      }
    },
    {
      lastName: {
        "$regex": filter
      }
    }]
  })

  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id
    }))
  })
});



module.exports = router;

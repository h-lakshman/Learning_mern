const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const { Account } = require('../db')

router.get('/balance', authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  })

  res.status(200).json({
    balance: account.balance
  })
});

router.post('/transfer', authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId
  })

  const { amount, to } = req.body

  if (amount > account.balance) {
    res.status(400).json({
      message: "Insufficient Balance"
    })
  }

  const recieverAccount = await Account.findOne({
    userId: to
  })

  if (!recieverAccount) {
    res.status(400).json({
      message: "Invalid account"
    })
  }
  account.balance -= amount
  await account.save()

  recieverAccount.balance += amount
  await recieverAccount.save()

  res.status(200).json({
    message: "Transfer successfull"
  })
})
module.exports = router

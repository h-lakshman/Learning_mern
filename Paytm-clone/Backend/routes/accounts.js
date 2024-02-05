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

})
module.exports = router

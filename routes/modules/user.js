const express = require('express')
const router = express.Router()
const User = require('../../models/userModel')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login',{ login:true })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/user/login'
}))


router.post('/register', (req, res) => {
  const input = req.body
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        return res.render('login', { input, register: true })
      }

      User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }).catch(err => console.log(err))

})


router.get('/logout',(req, res) => {
  req.logout()
  res.redirect('/user/login')
})
module.exports = router
const express = require("express")
const router = express.Router()
const User = require("../users/users-model.js")
const bcrypt = require("bcryptjs")
const {
    checkUsernameFree,
    checkUsernameExists,
    checkPasswordLength
} =require('./auth-middleware')


router.post('/register', checkPasswordLength, checkUsernameFree, async (req, res, next)=>{
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8)

  User.add({username, password: hash})
    .then(saved =>{
      res.status(201).json(saved)
    })
    .catch(next)

})


router.post('/login', checkUsernameExists, (req, res)=>{
  try {
    const verified = bcrypt.compareSync(req.body.password, req.userData.password)
    if(verified){
      req.session.user = req.userData
      res.status(200).json({message:`Welcome ${req.userData.username}`})
    }else{
      res.status(401).json({message:'Invalid Credentials'})
    }
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
})



  router.get('/logout', (req, res, next)=>{
    if(req.session.user){
      req.session.destroy( err =>{
        if(err){
          next(err)
        }else{
          res.status(200).json({message:'logged out'})
        }
      })
    }else{
      res.status(200).json({message: "no session"})
    }
  })

 module.exports = router
// Don't forget to add the router to the `exports` object so it can be required in other modules

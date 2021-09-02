const express = require("express")
const router = express.Router()
const User = require("../users/users-model.js")
const bcrypt = require("bcryptjs")
const {
    checkUsernameFree,
    checkUsernameExists,
    checkPasswordLength
} =require('./auth-middleware')

router.post('/register', checkPasswordLength, checkUsernameFree, async (req, res)=>{
  try{
    const hash = bcrypt.hashSync(req.body.password, 10)
    const newUser = await User.add({username: req.body.username, password:hash})
    res.status(200).json(newUser)
  }catch(err){
    res.status(500).json({message: err.message})
  }
})


router.post('/login', checkUsernameExists, (req, res)=>{
  try{
    if(req.body.username){
      res.json(`Welcome ${req.body.username}!`)
    }
  }catch(err){
    res.status(500).json({message: err.message})
  }
})



  router.get('/logout', (req, res)=>{
    if(req.session){
      req.session.destroy
      res.json("logged out")
    }else{
      res.json("no session")
    }
  })

 module.exports = router
// Don't forget to add the router to the `exports` object so it can be required in other modules

const User = require('../users/users-model.js')


function restricted(req, res, next) {
  if(req.session && req.session.user){
    next()
  }else{
    res.status(401).json("You shall not pass!")
  
}
}

async function checkUsernameFree(req, res, next) {
  try{
    const rows = await User.findBy({username:req.body.username})
    if(!rows.length){
        next()
    }
    else{
        res.status(422).json("Username taken")
    }
}catch(err){
    res.status(500).json(`Server error: ${err}`)
}
}


async function checkUsernameExists(req, res, next) {
  try{
    const rows = await User.findBy({username:req.body.username})
    


    if(rows.length){
        req.userData = rows[0]
        next()
    }
    else{
        res.status(401).json("Invalid credentials")
    }
}catch(err){
    res.status(500).json(`Server error: ${err}`)

}
}


function checkPasswordLength(req, res, next) {
  if(req.body.password.length < 3){
    res.status(422).json("Password must be longer than 3 chars")
  }else{
    next()
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports ={
  checkPasswordLength,
  checkUsernameExists,
  checkUsernameFree,
  restricted
}
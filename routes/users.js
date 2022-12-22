const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')



// Post, api/uers, Register user, public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   
   const {name, email, password} = req.body;

   try {
       let user = await User.findOne({ email });
       if(user) {
           return res.status(400).json({ message: 'User already exists' })
       }
       user = new User({name, email, password})
       
       user.password = await bcrypt.hash(password, 10)

       await user.save()

       const payload = {
           user: {
               id: user.id
           }
       }

       jwt.sign(payload, config.get('jwtSecret'), {
           expiresIn: 360000
       }, (err, token) => {
           if(err) throw Error;
           res.json({ token })
       })

   } catch (error) {
       console.error(error)
       res.status(500).json('Server error')
   }
})

module.exports = router;
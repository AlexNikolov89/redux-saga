const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config');
const User = require('../models/User');
const auth = require('../middleware/auth');


// Get, api/auth, logged in user, private
router.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
   } catch (error) {
       console.error(error)
       res.send(500).json('Server error')
   }
})


// Post, api/auth, auth user & get token user, public
router.post('/', [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter valid password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({ email });
       if(!user) {
           return res.status(400).json({ message: 'Invalid Credentials' })
       } 
       // check if password is a match
       const isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch) {
           res.status(400).json({ message: 'Invalid credentials' })
       }

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
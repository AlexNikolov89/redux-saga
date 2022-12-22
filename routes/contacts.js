const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

// Get, api/contacts, Get users contacts user, Private
// router.get('/', auth, async (req, res) => {
//    try {
//        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
//        res.json(contacts)
//    } catch (error) {
//        console.error(error)
//        res.status(500).send('Server error')
//    }
// })

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 })
        res.json(contacts)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
 })


// Post, api/contacts, Add new contact, Private
// router.post('/', [auth, [
//     check('name', 'Name is required').not().isEmpty()
// ]], async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const {name, email, phone, type} = req.body;

//     try {
//         const newContact = new Contact({
//             name, email, phone, type, user: req.user.id
//         })
//         const contact = await newContact.save();
//         res.json(contact)
//     } catch (error) {
//         console.error(error)
//        res.status(500).send('Server error')
//     }
// })

router.post('/', [
    check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, phone, type} = req.body;

    try {
        const newContact = new Contact({
            name, email, phone, type
        })
        const contact = await newContact.save();
        res.json(contact)
    } catch (error) {
        console.error(error)
       res.status(500).send('Server error')
    }
})


// Put, api/contacts/:id, Update contact, Private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;

    // Build contact obj
    const contactField = {};
    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;

    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({ message: 'Contact not found' })

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, 
        {$set: contactField},
        {new: true});

        res.json(contact)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})


// Delete, api/contacts/:id, Delete contact, Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json({ message: 'Contact not found' })

        // Make sure user owns contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        await Contact.findByIdAndRemove(req.params.id)

        res.json({ message: 'Contact Deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
})



module.exports = router;
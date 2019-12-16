var express = require("express");
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator.js');

const Contact = require('../models/contact');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error ocured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json({
                message: "Contacts fetched successfully",
                contacts: contacts
            });
        })
        .catch(error => {
            returnError(res, error);
        });
})

router.post('/', (req, res, next) => {
    const maxid = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxid,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: "Contact added successfully",
                contact: createdContact
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.put('/:id', (req, res, next) => {

    Contact.findOne({ id: req.params.id })
        .then(contact => {
            console.log(".then contacts.js");
            contact.id = req.body.id;
            contact._id = req.body._id;
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.imageUrl = req.body.imageUrl;
            contact.group = null;

            console.log("server/routers/contacts.js/put/findOne/.then");

            Contact.updateOne({ id: req.params.id }, contact)
                .then(result => {
                    res.status(204).json({
                        message: "Contact updated successfully"
                    });
                })
                .catch(error => {
                    console.log(error + " CONTACTS.JS 70");
                    res.status(500).json({
                        message: 'Contact not found',
                        error: { contact: 'Contact not found' }
                    });
                });
        })
        .catch(error => {
            console.log(error);
            returnError(res, error);
        });
});

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
        .then(contacts => {
            Contact.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(201).json({
                        contacts: "Contact deleted successfully"
                    });
                })
                .catch(error => {
                    res.sendStatus(500).json({
                        message: "Contact not found",
                        error: { contact: 'Contact not found' }
                    });
                });
        })
        .catch(error => {
            returnError(res, error);
        })
});

module.exports = router;
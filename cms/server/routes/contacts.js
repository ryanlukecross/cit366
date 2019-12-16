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
    console.log("contacts.js 50");
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            console.log("Attempting to update: " + id);
            contact.id = req.body.contact.id;
            contact.name = req.body.contact.name;
            contact.email = req.body.contact.email;
            contact.phone = req.body.contact.phone;
            contact.imageUrl = req.body.contact.imageUrl;

            console.log("server/routers/contacts.js/put/findOne/.then");

            Contact.updateOne({ id: req.params.id }, contact)
                .then(result => {
                    res.status(204).json({
                        message: "Contact updated successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Contact not found',
                        error: { contact: 'Contact not found' }
                    })
                });
        })
        .catch(error => {
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
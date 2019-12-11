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
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    })

    contact.save()
        .then(createdContact => {
            res.status(201).json({
                message: "Contact added successfully",
                contact: createdContact
            });
        })
        .catch(error => {
            returnedError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.contactId })
        .then(contact => {
            contact.name = req.body.name;
            contact.description = req.body.name;
            contact.url = req.body.url;

            Contact.updateOnd({ id: req.params.contactId }, contact)
                .then(result => {
                    resstatus(204).json({
                        message: "Contact updated successfully"
                    })
                })
                .catch(error => {
                    res.sendStatus(500).json({
                        message: 'Contact not found',
                        error: { contact: 'Contact not found' }
                    })
                });
        });
});

router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.contactId })
        .then(result => {
            res.status(204).json({
                message: "Contact deleted successfully"
            });
        })
        .catch(error => {
            res.sendStatus(500).json({
                message: "Contact not found",
                error: { contact: 'Contact not found' }
            });
        });
});

module.exports = router;
var express = require("express");
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator.js');

const Message = require('../models/message');

function returnError(res, error) {
    res.status(500).json({
        theirMessage: 'An error ocured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Message.find()
        .then(messages => {
            res.status(200).json({
                theirMessage: "Messages fetched successfully",
                messages: messages
            });
        })
        .catch(error => {
            returnError(res, error);
        });
})

router.post('/', (req, res, next) => {
    const maxid = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxid,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                theirMessage: "Message added successfully",
                message: createdMessage
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(messages => {
            Message.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(201).json({
                        messages: "Message deleted successfully"
                    });
                })
                .catch(error => {
                    res.sendStatus(500).json({
                        theirMessage: "Message not found",
                        error: { message: 'Message not found' }
                    });
                });
        })
        .catch(error => {
            returnError(res, error);
        })
});

module.exports = router;
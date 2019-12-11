var express = require("express");
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator.js');

const Document = require('../models/document');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error ocured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Document.find()
        .then(documents => {
            res.status(200).json({
                message: "Documents fetched successfully",
                documents: documents
            });
        })
        .catch(error => {
            returnError(res, error);
        });
})

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    })

    document.save()
        .then(createdDocument => {
            res.status(201).json({
                message: "Document added successfully",
                document: createdDocument
            });
        })
        .catch(error => {
            returnedError(res, error);
        });
});

router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            document.name = req.body.name;
            document.description = req.body.name;
            document.url = req.body.url;

            Document.updateOnd({ id: req.params.id }, document)
                .then(result => {
                    res.status(204).json({
                        message: "Document updated successfully"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Document not found',
                        error: { document: 'Document not found' }
                    })
                });
        });
});

router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(result => {
            res.status(204).json({
                message: "Document deleted successfully"
            });
        })
        .catch(error => {
            res.sendStatus(500).json({
                message: "Document not found",
                error: { document: 'Document not found' }
            });
        });
});

module.exports = router;
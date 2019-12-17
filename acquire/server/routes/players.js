var express = require("express");
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator.js');

const Player = require('../models/player');

function returnError(res, error) {
    res.status(500).json({
        message: 'An error ocured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Player.find()
        .then(players => {
            res.status(200).json({
                message: "Players fetched successfully",
                players: players
            });
        })
        .catch(error => {
            returnError(res, error);
        });
})

router.post('/', (req, res, next) => {
    const maxid = sequenceGenerator.nextId("players");

    const player = new Player({
        id: maxid,
        username: req.body.username,
        passcode: req.body.passcode,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        total_dollars_earned: req.body.total_dollars_earned,
        image_url: req.body.image_url,
        game_piece_url: req.body.game_piece_url
    });

    player.save()
        .then(createdPlayer => {
            res.status(201).json({
                message: "Player added successfully",
                player: createdPlayer
            });
        })
        .catch(error => {
            returnError(res, error);
        });
});

router.put('/:id', (req, res, next) => {

    Player.findOne({ id: req.params.id })
        .then(player => {
            player.username = req.body.username;
            player.passcode = req.body.passcode;
            player.first_name = req.body.first_name;
            player.last_name = req.body.last_name;
            player.email = req.body.email;
            player.phone = req.body.phone;
            player.total_dollars_earned = req.body.total_dollars_earned;
            player.image_url = req.body.image_url;
            player.game_piece_url = req.body.game_piece_url;

            console.log("server/routers/players.js/put/findOne/.then");

            Player.updateOne({ id: req.params.id }, player)
                .then(result => {
                    res.status(204).json({
                        message: "Player updated successfully"
                    });
                })
                .catch(error => {

                    res.status(500).json({
                        message: 'Player not found',
                        error: { player: 'Player not found' }
                    });
                });
        })
        .catch(error => {
            console.log(error);
            returnError(res, error);
        });
});

router.delete("/:id", (req, res, next) => {
    Player.findOne({ id: req.params.id })
        .then(players => {
            Player.deleteOne({ id: req.params.id })
                .then(result => {
                    res.status(201).json({
                        players: "Player deleted successfully"
                    });
                })
                .catch(error => {
                    res.sendStatus(500).json({
                        message: "Player not found",
                        error: { player: 'Player not found' }
                    });
                });
        })
        .catch(error => {
            returnError(res, error);
        })
});

module.exports = router;
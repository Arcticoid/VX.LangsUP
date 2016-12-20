var express = require('express');
var crypto = require("crypto");

module.exports = function (db) {
    var router = express.Router();

    router.get('/', function (req, res) {
        res.render('bundle/main/users.twig', {});
        return false;
    });

    router.post('/get', function(req, res) {

        db.all("SELECT * FROM `user` ", {}, function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }

            res.send({'users' : rows});

        });

    });


    router.post('/add', function(req, res) {

        if(!req.body.login || ! req.body.password) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }

        db.run("INSERT INTO `user` (`login`, `password`, `first_name`, `last_name`) VALUES (?1, ?2, ?3, ?4)", {1 : req.body.login, 2: crypto.createHash('sha1').update(req.body.password).digest('hex'), 3: req.body.first_name, 4: req.body.last_name},function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }
            res.send({"ok" : true});

        });


    });

    router.post('/delete', function(req, res) {

        if(!req.body.id) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }

        db.all("SELECT COUNT(`id`) as `count` FROM `user` ", {}, function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }

            if(rows[0]['count'] == 1) {
                res.send({"error" : true, "message" : "unable-to-delete-last-user"});
                return false;
            } else {

                db.run("DELETE FROM `user` WHERE `id` = ? ", {1: req.body.id},function(err,rows){

                    if(err) {
                        res.send({"error" : true, "message" : "something-went-wrong"});
                        return false;
                    }
                    res.send({"ok" : true});

                });

            }

        });

    });

    return router;

};
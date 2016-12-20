var express = require('express');

module.exports = function (db) {
    var router = express.Router();

    // router.get('/', function (req, res) {
    //     res.render('bundle/main/users.twig', {});
    //     return false;
    // });

    router.post('/get', function(req, res) {

        if (!db) {
            res.send({"error" : true, "message" : "database-file-is-not-found"});
            return false;
        }

        db.all("SELECT `id`, `name`, `description` FROM `bundle`" ,function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }
            var ret = [];


            for (var i = 0; i<Object.keys(rows).length; i++) {
                ret.push([rows[i].id, rows[i].name, rows[i].description])
            }

            res.send({'bundles' : ret});

        });

    });

    router.post('/add', function(req, res) {

        if (!db) {
            res.send({"error" : true, "message" : "database-file-is-not-found"});
            return false;
        }

        if(!req.body.name || ! req.body.description) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }

        db.run("INSERT INTO `bundle` (`name`, `description`) VALUES (?1, ?2)", {1 : req.body.name, 2: req.body.description},function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }
            res.send({"ok" : true});

        });

    });

    return router;

};
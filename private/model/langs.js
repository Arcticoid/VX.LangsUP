var express = require('express');
var config = require('../config/config');
var generate = require('../config/generate');
var fs = require('fs');

module.exports = function (db) {
    var router = express.Router();

    // router.get('/', function (req, res) {
    //     res.render('bundle/main/users.twig', {});
    //     return false;
    // });

    router.post('/get', function(req, res) {

        var project_id = req.body.project_id;


        if(!project_id || project_id == 0) {
            res.send({"error" : true, "message" : "chose-lang-section"});
            return false;
        }

        if (!db) {
            res.send({"error" : true, "message" : "database-file-is-not-found"});
            return false;
        }

        db.all("SELECT * FROM `bundle_lang` WHERE `bundle_id` = ?", {1:project_id}, function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }

            res.send({'langs' : rows});

        });

    });




    router.post('/add', function(req, res) {

        var project_id = req.body.project_id;

        if(!project_id || project_id == 0) {
            res.send({"error" : true, "message" : "chose-lang-section"});
            return false;
        }

        if (!db) {
            res.send({"error" : true, "message" : "database-file-is-not-found"});
            return false;
        }

        if(!req.body.key || ! req.body.value) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }

        db.run("INSERT INTO `bundle_lang` (`bundle_id`, `key`, `value`) VALUES (?1, ?2, ?3)", {1: project_id, 2: req.body.key,3: req.body.value},function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }
            res.send({"ok" : true});

        });


    });

    router.post('/delete', function(req, res) {

        if (!db) {
            res.send({"error" : true, "message" : "database-file-is-not-found"});
            return false;
        }

        if(!req.body.id) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }

        db.run("DELETE FROM `bundle_lang` WHERE `id` = ? ", {1: req.body.id},function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : "something-went-wrong"});
                return false;
            }
            res.send({"ok" : true});

        });


    });

    router.post('/set', function(req, res) {

        var id = req.body.id ? req.body.id : false;
        var key = req.body.key ? req.body.key : false;
        var value = req.body.value ? req.body.value : false;
        var update = key ? 'key' : value ? 'value' : false;

        if(!id || (key && value)) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }

        if (!db) {
            res.send({"error" : true, "message" : "database-file-is-not-found"});
            return false;
        }

        db.run("UPDATE `bundle_lang` SET `"+update+"` = ?1 WHERE `id` = ?2 ", {1: (update == 'key' ? key : value), 2: id},function(err,rows){

            if(err) {
                res.send({"error" : true, "message" : err});
                return false;
            }
            res.send({"ok" : true});

        });


    });

    router.post('/generate', function(req, res) {

        if (!db) {
            res.send({"error" : true, "message" : "database-file-is-not-found"});
            return false;
        }

        var project_id = req.body.project_id ? req.body.project_id : false;

        if(!project_id || project_id == 0) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }


        var promise = new Promise( function(resolve, reject) {  //todo ask Grigory - promise or callback ?

            var bundle_name;

            db.all("SELECT `name` FROM `bundle` WHERE `id` = '"+project_id+"'",function(err,rows){

                if(err) {
                    reject("something-went-wrong-bundle-name-select");
                    return false;
                }

                bundle_name = rows[0].name;
                resolve(bundle_name);

            });

        });

        promise.then(function(bundle_name) {

            db.all("SELECT `key`, `value` FROM `bundle_lang` WHERE `bundle_id` = '"+project_id+"'",function(err,rows) {

                if (err) {
                    reject("something-went-wrong-bundle-lang-select");
                    return false;
                }

                var langs = [];

                for (var i = 0; i<Object.keys(rows).length; i++) {
                    langs.push([rows[i].key, rows[i].value])
                }

                // if(!fs.existsSync(config.js_path)) {
                //     fs.mkdir(config.js_path, '0775');
                // }
                // if(!fs.existsSync(config.php_path)) {
                //     fs.mkdir(config.php_path, '0775');
                // }
                //
                // var js_path = config.js_path + '/'+bundle_name+'.js';
                // var php_path = config.php_path + '/'+bundle_name+'.php';
                //
                // var sync_js = fs.openSync(js_path, 'w');

                // var a = generate.php.example.split('{key}');
                // var b = a[1].split('{value}');

                // console.log(generate.php.example.split(/\S{3,5}/));
                // console.log(generate);
                // console.log(generate['php']);
                // console.log(generate[0][0]);
                // console.log(generate[0]['php']);
                // console.log(a[1].split('{value}'));

                for(var z=0; z<Object.keys(generate).length; z++) {

                    var ext = generate[z]['ext'];

                    var path = generate[z]['path'] + '/'+bundle_name+'.'+ext;

                    if(!fs.existsSync(generate[z]['path'])) {
                        fs.mkdir(generate[z], '0775');
                    }

                    var sync = fs.openSync(path, 'w');


                    var a = generate[z]['example'].split('{key}');
                    var b = a[1].split('{value}');

                    var text = generate[z]['start'];
                    for (var k = 0; k<Object.keys(rows).length; k++) {
                        text += a[0] + rows[k].key + b[0] + rows[k].value + b[1];
                    }
                    text += generate[z]['end'];

                    fs.writeFile(path, text);
                    fs.closeSync(sync);

                }

                // var text_js = "if(!lang) lang = {};\n\n";
                // for (var j = 0; j<Object.keys(rows).length; j++) {
                //     text_js += "lang['" + rows[j].key + "'] = '" + rows[j].value + "';\n";
                // }
                //
                // fs.writeFile(js_path, text_js);
                // fs.closeSync(sync_js);
                //
                //
                // var sync_php = fs.openSync(php_path, 'w');
                //
                // // var text_php = generate.php.start;
                // // for (var k = 0; k<Object.keys(rows).length; k++) {
                // //     text_php += a[0] + rows[k].key + b[0] + rows[k].value + b[1];
                // // }
                // // text_php += generate.php.end;
                //
                // // var text_php = "<?php\n\nreturn array(\n";
                // // for (var k = 0; k<Object.keys(rows).length; k++) {
                // //     text_php += "  '" + rows[k].key + "' => '" + rows[k].value + "',\n";
                // // }
                // // text_php += "\n);";
                //
                // fs.writeFile(php_path, text_php);
                // fs.closeSync(sync_php);

                res.send({"ok" : true});
                return false;

            });

        }, function(error) {
            res.send({"error" : true, "message" : error});
            return false;
        });
        return false;

    });

    return router;

};
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var config = require('./private/config/config');
var bodyParser = require('body-parser');
var connect = require('connect');
var app = express();

var Twig = require('twig');
var twig = Twig.twig;

app.engine('twig', require('twig').renderFile);

app.set('views', './view/');
app.use(express.static('./public/'));


var db;
var sqlite3 = require('sqlite3').verbose();

if(fs.existsSync(config.db)) {
    db = new sqlite3.Database(config.db);
} else {
    db = false;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.cookieParser('test'));


app.get('/*', function(req, res){

    res.render('bundle/main/index.twig', {});

});

app.post('/index/check/db', function(req, res) {

    if (!db) {
        res.send({"error" : true, "message" : "database-file-is-not-found"}); //todo wtf errors
        return false;
    }

    res.send(true);

});

app.post('/index/bundles/get', function(req, res) {

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

app.post('/index/langs/get', function(req, res) {

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


app.post('/index/bundle/add', function(req, res) {

    if (!db) {
        res.send({"error" : true, "message" : "database-file-is-not-found"});
        return false;
    }

    if(!req.body.name || ! req.body.description) {
        res.send({"error" : true, "message" : "something-went-wrong"});
        return false;
    }

    db.run("INSERT INTO `bundle` (`name`, `description`) VALUES ('"+req.body.name+"', '"+req.body.description+"')",function(err,rows){

        if(err) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }
        res.send({"ok" : true});

    });


});


app.post('/index/langs/add', function(req, res) {

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

    db.run("INSERT INTO `bundle_lang` (`bundle_id`, `key`, `value`) VALUES ('"+project_id+"', '"+req.body.key+"', '"+req.body.value+"')",function(err,rows){

        if(err) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }
        res.send({"ok" : true});

    });


});

app.post('/index/langs/delete', function(req, res) {

    if (!db) {
        res.send({"error" : true, "message" : "database-file-is-not-found"});
        return false;
    }

    if(!req.body.id) {
        res.send({"error" : true, "message" : "something-went-wrong"});
        return false;
    }

    db.run("DELETE FROM `bundle_lang` WHERE `id` = '"+req.body.id+"' ",function(err,rows){

        if(err) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }
        res.send({"ok" : true});

    });


});

app.post('/index/langs/set', function(req, res) {

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

    db.run("UPDATE `bundle_lang` SET `"+update+"` = '"+(update == 'key' ? key : value)+"' WHERE `id` = '"+id+"' ",function(err,rows){

        if(err) {
            res.send({"error" : true, "message" : err});
            return false;
        }
        res.send({"ok" : true});

    });


});

app.post('/index/langs/generate', function(req, res) {

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

            if(!fs.existsSync(config.js_path)) {
                fs.mkdir(config.js_path, '0775');
            }
            if(!fs.existsSync(config.php_path)) {
                fs.mkdir(config.php_path, '0775');
            }

            var js_path = config.js_path + '/'+bundle_name+'.js';
            var php_path = config.php_path + '/'+bundle_name+'.php';

            var sync_js = fs.openSync(js_path, 'w');

            var text_js = "if(!lang) lang = {};\n\n";
            for (var j = 0; j<Object.keys(rows).length; j++) {
                text_js += "lang['" + rows[j].key + "'] = '" + rows[j].value + "';\n";
            }

            fs.writeFile(js_path, text_js);
            fs.closeSync(sync_js);


            var sync_php = fs.openSync(php_path, 'w');

            var text_php = "<?php\n\nreturn array(\n";
            for (var k = 0; k<Object.keys(rows).length; k++) {
                text_php += "  '" + rows[k].key + "' => '" + rows[k].value + "'" + ",\n";
            }
            text_php += "\n);";

            fs.writeFile(php_path, text_php);
            fs.closeSync(sync_php);

            res.send({"ok" : true});
            return false;

        });

    }, function(error) {
        res.send({"error" : true, "message" : error});
        return false;
    });
    return false;

});

app.post('/index/install/db', function(req, res) {

    if(fs.existsSync(config.db)) {
        res.send({"error" : true, "message" : "db-already-exists"});
        return false;
    }

    fs.readFile('./dump.sql', 'utf-8', function (err, text) {

        var sql = text.toString();

        db = new sqlite3.Database(config.db);

        db.exec(sql, function () {
            res.send({"ok" : true});
        });

    });

});

var httpServer = http.createServer(app);
httpServer.listen(8080);

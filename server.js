var express = require('express');
var http = require('http');
var fs = require('fs');
var crypto = require("crypto");
var config = require('./private/config/config');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var serveStatic = require('serve-static');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();

var app = express();

var Twig = require('twig');
var twig = Twig.twig;

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(serveStatic('./public/'));
    app.use(cookieParser());
    app.set('views', './view/');
    app.engine('twig', require('twig').renderFile);
    app.use(expressSession({ //todo uncomment store for sqlite session
        secret: 'test',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

}

var db;

if(fs.existsSync(config.db)) {
    db = new sqlite3.Database(config.db);
} else {
    db = false;
}

passport.use(new LocalStrategy(function(username, password, done) {
    db.get('SELECT login, id FROM user WHERE login = ?1 AND password = ?2', {1 : username, 2: crypto.createHash('sha1').update(password).digest('hex')}, function(err, row) {
        if (!row) return done(null, false);
        return done(null, row);
    });
}));

passport.serializeUser(function(user, done) {
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    db.get('SELECT id, login FROM user WHERE id = ?1', {1: user['id']}, function(err, row) {
        if (!row) return done(null, false);
        return done(null, row);
    });
});

// var auth = function(req, res, next){
//     if (!req.isAuthenticated()) {
//         res.redirect('/login');
//         return false;
//     }
//     else {
//         next();
//     }
// };

app.all('/*', function(req, res, next) {
    if(!req.isAuthenticated() && req.originalUrl != '/login/auth' && req.originalUrl != '/index/install/db') {
        if(!db) {
            res.render('bundle/main/install.twig', {});
            return false;
        } else {
            res.render('bundle/main/login.twig', {});
            return false;
        }

    } else {
        next();
    }
});

app.get('/login', function(req, res) {

    if(!db) {
        res.redirect('/install');
        // res.render('bundle/main/install.twig', {});
        return false;
    } else {
        res.render('bundle/main/login.twig', {});
        return false;
    }

});

app.get('/logout', function(req, res) {

    req.logout();
    res.redirect('/');
    return false;

});

app.get('/install', function(req, res) {
    if(db) {
        res.redirect('/index');
    } else {
        res.render('bundle/main/install.twig', {});
    }
    return false;

});

app.get('/404', function(req, res) {
    res.render('bundle/main/404.twig', {});
    return false;
});

app.get('/', function(req, res) {
    res.redirect('/index');
    return false;
});

app.get('/success', function(req, res) {
    res.send({'ok' : true});
    return false;
});

app.get('/fail', function(req, res) {
    res.send( {error : true, message : 'unauthorized'});
    return false;
});

app.get('/users', function (req, res) {
    if(!req.isAuthenticated()) {
        // res.redirect('/login');
        return false;

    } else {
        res.render('bundle/main/users.twig', {});
        return false;
    }

});

app.post('/login/auth', passport.authenticate('local', { successRedirect: '/success',  failureRedirect: '/fail' }), function(req, res) {

    res.send('123'); //todo wtf is here never reached?

});


app.get('/index',  function(req, res){

    res.render('bundle/main/index.twig', {});
    return false;

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

    db.run("INSERT INTO `bundle` (`name`, `description`) VALUES (?1, ?2)", {1 : req.body.name, 2: req.body.description},function(err,rows){

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

    db.run("INSERT INTO `bundle_lang` (`bundle_id`, `key`, `value`) VALUES (?1, ?2, ?3)", {1: project_id, 2: req.body.key,3: req.body.value},function(err,rows){

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

    db.run("DELETE FROM `bundle_lang` WHERE `id` = ? ", {1: req.body.id},function(err,rows){

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

    db.run("UPDATE `bundle_lang` SET `"+update+"` = ?1 WHERE `id` = ?2 ", {1: (update == 'key' ? key : value), 2: id},function(err,rows){

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
        res.send({"error" : true, "message" : "db-already-exists"}); //todo wtf errors
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

app.post('/index/users/get', function(req, res) {

    if (!db) {
        res.send({"error" : true, "message" : "database-file-is-not-found"});
        return false;
    }

    db.all("SELECT * FROM `user` ", {}, function(err,rows){

        if(err) {
            res.send({"error" : true, "message" : "something-went-wrong"});
            return false;
        }

        res.send({'users' : rows});

    });

});


app.post('/index/users/add', function(req, res) {

    if (!db) {
        res.send({"error" : true, "message" : "database-file-is-not-found"});
        return false;
    }

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

app.post('/index/users/delete', function(req, res) {

    if (!db) {
        res.send({"error" : true, "message" : "database-file-is-not-found"});
        return false;
    }

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

app.get('*', function(req, res){
    res.redirect('/index');
});


var httpServer = http.createServer(app);
httpServer.listen(8080);

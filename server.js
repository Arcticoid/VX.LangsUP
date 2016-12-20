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
    app.use(expressSession({
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

app.all('/*', function(req, res, next) {
    if(!req.isAuthenticated() && req.originalUrl != '/login/auth' && req.originalUrl != '/install/db' && req.originalUrl != '/fail') {
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

    if(!req.isAuthenticated()) {
        res.render('bundle/main/login.twig', {});
    } else {
        res.redirect('/index');
    }
    return false;

});

app.get('/logout', function(req, res) {

    req.logout();
    res.redirect('/');
    return false;

});

// app.get('/install', function(req, res) {
//     if(db) {
//         res.redirect('/index');
//     } else {
//         res.render('bundle/main/install.twig', {});
//     }
//     return false;
// });

app.get('/404', function(req, res) {
    res.render('bundle/main/404.twig', {});
    return false;
});

app.get('/success', function(req, res) {
    res.send({'ok' : true});
    return false;
});

app.get('/fail', function(req, res) {
    res.send( {error : true, message : 'wrong-login-or-password'});
    return false;
});

app.post('/login/auth', passport.authenticate('local',
    {
        successRedirect: '/success',
        failureRedirect: '/fail'
    }), function(req, res) {
});


app.get('/index',  function(req, res){
    res.render('bundle/main/index.twig', {});
    return false;
});

app.post('/index/check/db', function(req, res) {

    if (!db) {
        res.send({"error" : true, "message" : "database-file-is-not-found"});
        return false;
    }

    res.send({'ok': true});

});

if(db) {
    routerStart();
}

app.post('/install/db', function(req, res) {

    if(fs.existsSync(config.db)) {
        res.send({"error" : true, "message" : "db-already-exists"}); //todo wtf errors
        return false;
    }

    fs.readFile('./dump.sql', 'utf-8', function (err, text) {

        var sql = text.toString();

        db = new sqlite3.Database(config.db);

        db.exec(sql, function () {

            routerStart();

            res.send({"ok" : true});
        });

    });

});

function routerStart() {
    app.use('/users', require('./private/model/users')(db));

    app.use('/index/bundle', require('./private/model/bundle')(db));

    app.use('/index/langs', require('./private/model/langs')(db));

    app.get('*', function(req, res){
        res.redirect('/index');
    });
}


var httpServer = http.createServer(app);
httpServer.listen(8080);

'use strict';

const express = require('express');
const app = express();
const request = require('request');
const config = require('config');
const apikey = process.env.JWT_SECRET || require('./.credentials/jwt').apikey;
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


function getToken(apikey) {
    return new Promise(function (resolve, reject) {
        request({
            method: 'POST',
            url: config.api.url + '/auth',
            json: true,
            body: {
                apikey: apikey
            }
        }, function (err, response, body) {
            err ? reject(err) : resolve(body);
            //TODO Chequear err o body para renovar el token.
        });
    });
}

app.get('/', function (req, res) {
    //TODO call getToken once
    getToken(apikey)
        .then(function (data) {
            res.render('hotels', {layout: 'layout',token: data.token});
        })
        .catch(function (err) {
            res.render('hotels', {layout: 'layout',token: ''});
        });
});

app.use(express.static('public'));

module.exports = app;
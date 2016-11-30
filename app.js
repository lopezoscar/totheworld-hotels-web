'use strict';

const express = require('express');
const app = express();
const request = require('request');
const config = require('config');
const apikey = process.env.JWT_SECRET || require('./.credentials/jwt').apikey;
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

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
    getToken(apikey)
        .then(function (data) {
            res.render('hotels', {layout: 'layout',token: data.token});
        })
        .catch(function (err) {
            res.json({err: err});
        });
});

app.use(express.static('public'));

module.exports = app;
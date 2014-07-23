var qs = require('querystring');

var debug = require('debug')('chirp-rest');
var OAuth = require('oauth-request');

module.exports = ChirpRest;

function ChirpRest(opt) {
    if(!(this instanceof ChirpRest)) {
        return new ChirpRest(opt);
    }

    if(!(opt.consumer && opt.consumer.public && opt.consumer.secret)) {
        throw new Error('consumer.public and consumer.secret are required');
    }

    if(!(opt.token && opt.token.public && opt.token.secret)) {
        throw new Error('token.public and token.secret are required');
    }

    this.consumer = opt.consumer;
    this.token    = opt.token;

    this.oauth = OAuth({
        consumer: this.consumer,
        token: this.token
    });
}

ChirpRest.prototype.get = function(url, param, callback) {
    if(arguments.length === 2) {
        callback = param;
        param = {};
    }

    if(!url) {
        throw new Error('url is required');
    }

    if(!callback) {
        throw new Error('callback is required');
    }

    debug('#get', url, param);

    this.oauth.get({
        url: url,
        qs: param,
        json: true
    }, function(err, res, body) {
        if(err) {
            debug('#get request err', err);
            return callback(err);
        }

        if(res.statusCode != 200) {
            debug('#get twitter err', body);
            return callback(body);
        }

        debug('#get success');

        return callback(null, body);
    });
};

ChirpRest.prototype.post = function(url, param, callback) {
    var self = this;

    if(arguments.length === 2) {
        callback = param;
        param = {};
    }

    if(!url) {
        throw new Error('url is required');
    }

    if(!callback) {
        throw new Error('callback is required');
    }

    debug('#post', url, param);

    this.oauth.post({
        url: url,
        form: param,
        json: true
    }, function(err, res, body) {
        if(err) {
            debug('#post request err', err);
            return callback(err);
        }

        if(res.statusCode != 200) {
            debug('#post twitter err', body);
            return callback(body);
        }

        debug('#post success');

        return callback(null, body);
    });
};
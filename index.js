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

/**
 * debug
 * 
 * @api private
 */
ChirpRest.prototype._log = debug;

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

    this._log('#get', url, param);

    this.oauth.get({
        url: url,
        qs: param,
        json: true
    }, callback);
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

    this._log('#post', url, param);

    this.oauth.post({
        url: url,
        form: param,
        json: true
    }, callback);
};
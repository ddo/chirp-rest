var qs = require('querystring');

var debug   = require('debug')('chirp-rest');
var request = require('request');
var OAuth   = require('oauth-1.0a');

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
        consumer: this.consumer
    });
}

/**
 * debug
 * 
 * @api private
 */
ChirpRest.prototype._log = debug;

/**
 * send api request
 * @param  {Object}   opt
 * @param  {Function} callback
 * 
 * @api private
 */
ChirpRest.prototype._api = function(opt, callback) {
    //enable json
    opt.json = true;

    this._log('api', opt);

    request(opt, callback);
};

ChirpRest.prototype.get = function(url, param, callback) {
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

    var request_data = {
        url: url,
        method: 'GET',
        data: param
    };

    self._api({
        url: url,
        method: 'GET',
        qs: self.oauth.authorize(request_data, self.token)
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

    var request_data = {
        url: url,
        method: 'POST',
        data: param
    };

    /*
    LOL this shit take me a whole day !

    Cant use !!!

    self._api({
        url: url,
        method: 'POST',
        form: self.oauth.authorize(request_data, self.token)
    }, callback);

    below is the correct way
    */

    var body = qs.stringify(self.oauth.authorize(request_data, self.token))
        .replace(/\!/g, "%21")
        .replace(/\*/g, "%2A")
        .replace(/\'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29");

    self._api({
        url: url,
        method: 'POST',
        body: body,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, callback);
};
chirp-rest [![Build Status](https://travis-ci.org/ddo/chirp-rest.svg)](https://travis-ci.org/ddo/chirp-rest)
==============

> twitter rest apis in nodejs

[![NPM version](https://badge.fury.io/js/chirp-rest.png)](http://badge.fury.io/js/chirp-rest)
[![Dependency Status](https://david-dm.org/ddo/chirp-rest.png?theme=shields.io)](https://david-dm.org/ddo/chirp-rest)

[![Coverage Status](https://coveralls.io/repos/ddo/chirp-rest/badge.png?branch=master)](https://coveralls.io/r/ddo/chirp-rest?branch=master)
[![Code Climate](https://codeclimate.com/github/ddo/chirp-rest.png)](https://codeclimate.com/github/ddo/chirp-rest)

## Installation

```
npm i chirp-rest --save
```

## Usage

```js
var ChirpRest = require('./');

var twitter = new ChirpRest({
    consumer: {
        public: 'xxxxx',
        secret: 'xxxxx'
    },
    token: {
        public: 'xxxxx'
        secret: 'xxxxx'
    }
});

//get user timeline
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(err, body) {
    //body -> tweets
});
```

## [Example](/example.js)

* get user timeline

```js
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(err, body) {
    //body -> tweets
});
```

* get user timeline limit 5

```js
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {
    count: 5
}, function(err, body) {
    //body -> tweets
});
```

* get user timeline

```js
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(err, body) {
    //body -> tweets
});
```

* post new status

```js
twitter.post('https://api.twitter.com/1.1/statuses/update.json', {
    status: 'chirp chirp'
}, function(err, body) {
    //body -> tweet data
});
```

https://dev.twitter.com/docs/api/1.1

## API

* ``.get(url, parameters, callback)``
* ``.post(url, parameters, callback)``

## Option

* ``url``:``String`` Twitter api endpoint
* ``parameters``: ``Object`` Twitter api parameters ``optional``
* ``callback``

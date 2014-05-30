var ChirpRest = require('./');

var twitter = new ChirpRest({
    consumer: {
        public: process.env.TWITTER_CONSUMER_PUBLIC,
        secret: process.env.TWITTER_CONSUMER_SECRET
    },
    token: {
        public: process.env.TWITTER_TOKEN_PUBLIC,
        secret: process.env.TWITTER_TOKEN_SECRET
    }
});

//get user timeline
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(err, res, body) {
    console.log(err);
    console.log(body.length);
});

//get user timeline count = 5
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {
    count: 5
}, function(err, res, body) {
    console.log(err);
    console.log(body.length);
});

//get user timeline count = 10
twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json?count=10', function(err, res, body) {
    console.log(err);
    console.log(body.length);
});
/*
//post new status
twitter.post('https://api.twitter.com/1.1/statuses/update.json', {
    status: 'Ladies!'
}, function(err, res, body) {
    console.log(err);
    console.log(body);
    
    //delete
    twitter.post('https://api.twitter.com/1.1/statuses/destroy/' + body.id + '.json', function(err, res, body) {
        console.log(err);
        console.log(body);
    });
});
*/




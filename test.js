var expect = require('chai').expect;

var ChirpRest = require('./');

describe("chirp-stream", function() {
    var twitter = ChirpRest({
        consumer: {
            public: process.env.TWITTER_CONSUMER_PUBLIC,
            secret: process.env.TWITTER_CONSUMER_SECRET
        },
        token: {
            public: process.env.TWITTER_TOKEN_PUBLIC,
            secret: process.env.TWITTER_TOKEN_SECRET
        }
    });

    describe("#get tweets", function() {
        it("should be return 20 tweets", function(done) {
            
            twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(err, res, tweets) {
                
                expect(tweets).to.be.an('array').that.have.length(20);
                expect(tweets[0]).to.have.property('id');
                expect(tweets[0]).to.have.property('created_at');
                done();
            });
        });
    });

    describe("#get 5 tweets", function() {
        it("should be return 5 tweets", function(done) {
            
            twitter.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {
                count: 5
            }, function(err, res, tweets) {
                
                expect(tweets).to.be.an('array').that.have.length(5);
                expect(tweets[0]).to.have.property('id');
                expect(tweets[0]).to.have.property('created_at');
                done();
            });
        });
    });

    var tweet_id;
    var message = 'Yay....!!!';

    describe("#post new tweet", function() {
        it("should create a new tweet", function(done) {
            
            twitter.post('https://api.twitter.com/1.1/statuses/update.json', {
                status: message
            }, function(err, res, tweet) {
                tweet_id = tweet.id_str;

                expect(tweet).to.have.property('id');
                expect(tweet).to.have.property('created_at');
                expect(tweet).to.have.property('text', message);
                done();
            });
        });
    });

    describe("#delete tweet", function() {
        it("should delete that new tweet", function(done) {
            
            twitter.post('https://api.twitter.com/1.1/statuses/destroy/' + tweet_id + '.json', function(err, res, tweet) {
                expect(tweet).to.have.property('id');
                expect(tweet).to.have.property('created_at');
                expect(tweet).to.have.property('text', message);
                done();
            });
        });
    });
});
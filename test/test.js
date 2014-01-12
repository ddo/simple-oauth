var expect;

if(typeof(module) !== 'undefined') { //node
    expect = require('chai').expect;
    var SimpleOAuth = require('../');
} else { //browser
    expect = chai.expect;
}

describe("SimpleOAuth", function() {
    var simple_oauth = new SimpleOAuth({
        consumer_key:       '<consumer_key>',
        consumer_secret:    '<consumer_secret>',
        url_request_token:  'https://api.twitter.com/oauth/request_token',
        url_authorize:      'https://api.twitter.com/oauth/authorize',
        url_access_token:   'https://api.twitter.com/oauth/access_token'
    });

    describe("Constructor", function() {
        it("should a object and instance of SimpleOAuth", function() {
            expect(simple_oauth).to.be.an('object');
            expect(simple_oauth).to.be.an.instanceof(SimpleOAuth);
        });

        it("should passing all 5 params", function() {
            expect(simple_oauth).to.have.property('consumer_key');
            expect(simple_oauth).to.have.property('consumer_secret');
            expect(simple_oauth).to.have.property('url_request_token');
            expect(simple_oauth).to.have.property('url_authorize');
            expect(simple_oauth).to.have.property('url_access_token');
        });
    });

    describe("#deparam", function() {
        var str = "oauth_token=<oauth token>&oauth_token_secret=<oauth token secret>&oauth_callback_confirmed=true ";

        var result = simple_oauth.deparam(str);

        it("should return an object from string", function() {
            expect(result).to.be.an('object');
        });

        it("that object should have the correct keys and values", function() {
            expect(result).to.have.property('oauth_token', '<oauth token>');
            expect(result).to.have.property('oauth_token_secret', '<oauth token secret>');
            expect(result).to.have.property('oauth_callback_confirmed', 'true ');
        });
    });

    describe("#authorize", function() {
        var tokens = {
            oauth_token         : '<oauth_token>',
            oauth_token_secret  : '<oauth_token_secret>'
        };

        it("should return an correct link", function() {
            expect(simple_oauth.authorize(tokens)).to.equal(simple_oauth.url_authorize + '?oauth_token=' + tokens.oauth_token);
        });
    });

    describe("#do (core)", function() {
        var opts = {
            url: 'https://api.twitter.com/oauth/request_token',
            type: 'GET',
            tokens: {
                oauth_token: '<oauth_token>',
                oauth_token_secret: '<oauth_token_secret>'
            },
            data: {
                a: 'a',
                b: 'b'
            }
        };

        var result = simple_oauth.do(opts);

        it("should return an oauth data object", function() {
            expect(result).to.be.an('object');
        });

        it("should return an valid oauth request data", function() {
            expect(result).to.have.property('oauth_consumer_key');
            expect(result).to.have.property('oauth_nonce');
            expect(result).to.have.property('oauth_signature');
            expect(result).to.have.property('oauth_signature_method');
            expect(result).to.have.property('oauth_timestamp');
            expect(result).to.have.property('oauth_version');
            expect(result).to.have.property('oauth_token');
        });
    });

    describe("#requestToken", function() {
        var result = simple_oauth.requestToken();

        it("should return an oauth data object", function() {
            expect(result).to.be.an('object');
        });

        it("should return an valid oauth request data", function() {
            expect(result).to.have.property('url', simple_oauth.url_request_token);
            expect(result).to.have.property('type', 'POST');
            expect(result.data).to.have.property('oauth_nonce');
            expect(result.data).to.have.property('oauth_signature');
            expect(result.data).to.have.property('oauth_signature_method');
            expect(result.data).to.have.property('oauth_timestamp');
            expect(result.data).to.have.property('oauth_version');
        });
    });

    describe("#requestToken with custom data", function() {
        var result = simple_oauth.requestToken({
            oauth_callback: 'http://www.ddo.me'
        });

        it("should return an oauth data object", function() {
            expect(result).to.be.an('object');
        });

        it("should return an valid oauth request data", function() {
            expect(result).to.have.property('url', simple_oauth.url_request_token);
            expect(result).to.have.property('type', 'POST');
            expect(result.data).to.have.property('oauth_nonce');
            expect(result.data).to.have.property('oauth_signature');
            expect(result.data).to.have.property('oauth_signature_method');
            expect(result.data).to.have.property('oauth_timestamp');
            expect(result.data).to.have.property('oauth_version');
            expect(result.data).to.have.property('oauth_callback', 'http://www.ddo.me');
        });
    });

    describe("#accessToken", function() {
        var tokens = {
            oauth_token: '<oauth_token>',
            oauth_token_secret: '<oauth_token_secret>'
        };

        var oauth_verifier = '<oauth_verifier>';

        var result = simple_oauth.accessToken(tokens, oauth_verifier);

        it("should return an oauth data object", function() {
            expect(result).to.be.an('object');
        });

        it("should return an valid oauth request data", function() {
            expect(result).to.have.property('url', simple_oauth.url_access_token);
            expect(result).to.have.property('type', 'POST');
            expect(result.data).to.have.property('oauth_consumer_key');
            expect(result.data).to.have.property('oauth_nonce');
            expect(result.data).to.have.property('oauth_signature');
            expect(result.data).to.have.property('oauth_signature_method');
            expect(result.data).to.have.property('oauth_timestamp');
            expect(result.data).to.have.property('oauth_version');
            expect(result.data).to.have.property('oauth_token');
            expect(result.data).to.have.property('oauth_verifier');
        });
    });
    
});
var expect;

if(typeof(module) !== 'undefined') { //node
    expect = require('chai').expect;
    var SimpleOAuth = require('../');
} else { //browser
    expect = chai.expect;
}

describe("SimpleOAuth", function() {
    var simple_oauth = SimpleOAuth({
        consumer: {
            public: '<consumer_key>',
            secret: '<consumer_secret>'
        },
        url: {
            request_token: 'https://api.twitter.com/oauth/request_token',
            authorize: 'https://api.twitter.com/oauth/authorize',
            access_token: 'https://api.twitter.com/oauth/access_token'
        }
    });

    // console.log(simple_oauth);

    simple_oauth.test();

    /*

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

    describe("#do", function() {
        var request_data = {
            url: 'https://api.twitter.com/oauth/request_token',
            method: 'GET',
            data: {
                a: 'a',
                b: 'b'
            }
        };

        var tokens = {
            oauth_token: '<oauth_token>',
            oauth_token_secret: '<oauth_token_secret>'
        };

        request_data = simple_oauth.do(request_data, tokens);

        it("should be an data object", function() {
            expect(request_data).to.be.an('object');
        });

        it("request_data.data should be an valid oauth request data", function() {
            expect(request_data.data).to.have.property('oauth_consumer_key');
            expect(request_data.data).to.have.property('oauth_nonce');
            expect(request_data.data).to.have.property('oauth_signature');
            expect(request_data.data).to.have.property('oauth_signature_method');
            expect(request_data.data).to.have.property('oauth_timestamp');
            expect(request_data.data).to.have.property('oauth_version');
            expect(request_data.data).to.have.property('oauth_token');
        });
    });

    describe("#requestToken", function() {
        var request_data = simple_oauth.requestToken();

        it("should be an oauth data object", function() {
            expect(request_data).to.be.an('object');
        });

        it("request_data.data should be an valid oauth request data", function() {
            expect(request_data).to.have.property('url', simple_oauth.url_request_token);
            expect(request_data).to.have.property('method', 'POST');
            expect(request_data.data).to.have.property('oauth_nonce');
            expect(request_data.data).to.have.property('oauth_signature');
            expect(request_data.data).to.have.property('oauth_signature_method');
            expect(request_data.data).to.have.property('oauth_timestamp');
            expect(request_data.data).to.have.property('oauth_version');
        });
    });

    describe("#requestToken with custom data", function() {
        var request_data = simple_oauth.requestToken({
            oauth_callback: 'http://www.ddo.me'
        });

        it("should be an oauth data object", function() {
            expect(request_data).to.be.an('object');
        });

        it("request_data.data should be an valid oauth request data", function() {
            expect(request_data).to.have.property('url', simple_oauth.url_request_token);
            expect(request_data).to.have.property('method', 'POST');
            expect(request_data.data).to.have.property('oauth_nonce');
            expect(request_data.data).to.have.property('oauth_signature');
            expect(request_data.data).to.have.property('oauth_signature_method');
            expect(request_data.data).to.have.property('oauth_timestamp');
            expect(request_data.data).to.have.property('oauth_version');
            expect(request_data.data).to.have.property('oauth_callback', 'http://www.ddo.me');
        });
    });

    describe("#accessToken", function() {
        var tokens = {
            oauth_token: '<oauth_token>',
            oauth_token_secret: '<oauth_token_secret>'
        };

        var oauth_verifier = '<oauth_verifier>';

        var request_data = simple_oauth.accessToken(tokens, oauth_verifier);

        it("should be an oauth data object", function() {
            expect(request_data).to.be.an('object');
        });

        it("request_data.data should be an valid oauth request data", function() {
            expect(request_data).to.have.property('url', simple_oauth.url_access_token);
            expect(request_data).to.have.property('method', 'POST');
            expect(request_data.data).to.have.property('oauth_consumer_key');
            expect(request_data.data).to.have.property('oauth_nonce');
            expect(request_data.data).to.have.property('oauth_signature');
            expect(request_data.data).to.have.property('oauth_signature_method');
            expect(request_data.data).to.have.property('oauth_timestamp');
            expect(request_data.data).to.have.property('oauth_version');
            expect(request_data.data).to.have.property('oauth_token');
            expect(request_data.data).to.have.property('oauth_verifier');
        });
    });
    */
});
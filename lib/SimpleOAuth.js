//Nodejs export
if(typeof(module) !== 'undefined') {
	module.exports = SimpleOAuth;
	var OAuth = require('./OAuth');
}

function SimpleOAuth(opts) {
	this.consumer_key      = opts.consumer_key;
	this.consumer_secret   = opts.consumer_secret;
	this.url_request_token = opts.url_request_token;
	this.url_authorize     = opts.url_authorize;
	this.url_access_token  = opts.url_access_token;
}

//request Token -> get verifier -> access Token

/*
	@param {Object} option object
	{
		url
		type
		data
		//optional
		tokens: {
			oauth_token
			oauth_token_secret
		}
	}
*/
SimpleOAuth.prototype.do = function(opts) {
	var accessor = {
        consumerSecret: this.consumer_secret
    };

	var message = {
        action: opts.url,
        method: opts.type || 'GET',
        parameters: [
            ["oauth_consumer_key", this.consumer_key],
            ["oauth_signature_method", "HMAC-SHA1"]
        ]
    };

    if(opts.tokens) {
		if(opts.tokens.oauth_token_secret)
			accessor.tokenSecret = opts.tokens.oauth_token_secret;
		if(opts.tokens.oauth_token)
			message.parameters.push(["oauth_token", opts.tokens.oauth_token]);
    }

    for(var key in opts.data) {
		OAuth.setParameter(message, key, opts.data[key]);
    }

    OAuth.completeRequest(message, accessor);

    return OAuth.getParameterMap(message.parameters);
};

/*
	@param {Object} data object you want to send along with

	Should return access token + secret token then use it to get verifier from website
	@return {Object}
	{
		oauth_token: "<oauth token>",
		oauth_token_secret: "<oauth token secret>"
	}
*/
SimpleOAuth.prototype.requestToken = function(data) {
	return {
		url: this.url_request_token,
		type: 'POST',
		data: this.do({
			url: this.url_request_token,
			type: 'POST',
			data: data
		})
	};
};

/*
	@return {String} authorize link
	Note: you will get the oauth_verifier after authorize done on website
*/
SimpleOAuth.prototype.authorize = function(tokens) {
	return this.url_authorize + '?oauth_token=' + tokens.oauth_token;
};

/*
	Note: you will get the oauth_verifier after authorize done on website
	@return {Object}
	{
		oauth_token: "61260444-dtoVvYza8gkxxXqhSBAUW3SdlP1oFrUE0ZVypRmLk",
		oauth_token_secret: "PGfaBzqbcipDdo6Hia95DiNTIjRvNNULTl9Y98qXKKZKO",
		user_id: "61260444",
		screen_name: "JoeDdo"
	}
*/
SimpleOAuth.prototype.accessToken = function(tokens, oauth_verifier) {
	return {
		url: this.url_access_token,
		type: 'POST',
		data: this.do({
			tokens: tokens,
			url: this.url_access_token,
			type: 'POST',
			data: {
				oauth_verifier: oauth_verifier
			}
		})
	};
};

/*
	@params_str {String} Return string from server
	"oauth_token=<oauth token>&oauth_token_secret=<oauth token secret>&oauth_callback_confirmed=true "
	
	@return
	{
		oauth_token: "<oauth token>",
		oauth_token_secret: "<oauth token secret>",
		oauth_callback_confirmed: "true "
	}
*/
SimpleOAuth.prototype.deparam = function(params_str) {
	var params = {};
	var arr = params_str.split('&');

	for(var i = 0; i < arr.length; i++) {
		var item = arr[i].split('=');
		params[item[0]] = item[1];
	}
	return params;
};


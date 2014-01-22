(function() {

if(typeof(module) !== 'undefined' && typeof(exports) !== 'undefined') {
	module.exports = SimpleOAuth;
}

/*
	Constructor
	@param {Object} Options
	{
		consumer: {
			public
			secret
		},
		url: {
			request_token
			authorize
			access_token
		},
		version, (1.0a or 2.0)
		type, (OneLegged, TwoLegged, ThreeLegged, Echo, xAuth)
		label: {
			url,
			method,
			data,
			headers
		}
	}
*/
function SimpleOAuth(opts) {
	this.consumer = opts.consumer;
	this.url      = opts.url;
	this.version  = opts.version	|| '1.0a';
	this.type     = opts.type		|| 'ThreeLegged';
	
	//default label
	this.label = {
		url:	'url',
		method: 'method',
		data:	'data',
		headers: 'headers'
	};

	if(opts.label) {
		this.label.url     = opts.label.url		|| this.label.url;
		this.label.method  = opts.label.method	|| this.label.method;
		this.label.data    = opts.label.data	|| this.label.data;
		this.label.headers = opts.label.headers	|| this.label.headers;
	}

	return new (require('./oauth' + parseInt(this.version, 10))(this.type))();
}
})();
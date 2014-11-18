/**
* @author admin
*/

exports.startHandlers = function startHandlers () {
	addHttpRequestHandler(
      '/testRemoteAddressExists',
      'test',
      'testRemoteAddressExists'
	);
	addHttpRequestHandler(
      '/testRemoteAddressValue',
      'test',
      'testRemoteAddressValue'
	);
	addHttpRequestHandler(
      '/testRemotePortExists',
      'test',
      'testRemotePortExists'
	);
	addHttpRequestHandler(
      '/testRemotePortValue',
      'test',
      'testRemotePortValue'
	);
	addHttpRequestHandler(
      '/testLocalAddressExists',
      'test',
      'testLocalAddressExists'
	);
	addHttpRequestHandler(
      '/testLocalAddressValue',
      'test',
      'testLocalAddressValue'
	);
	addHttpRequestHandler(
      '/testLocalPortExists',
      'test',
      'testLocalPortExists'
	);
	addHttpRequestHandler(
      '/testLocalPortValue',
      'test',
      'testLocalPortValue'
	);
	addHttpRequestHandler(
      '/testIsSSLExists',
      'test',
      'testIsSSLExists'
	);
	addHttpRequestHandler(
      '/testIsSSLValue',
      'test',
      'testIsSSLValue'
	);
};

exports.testRemoteAddressExists = function testRemoteAddressExists (request, response) {	
	response.contentType = 'text/plain';	
	return typeof request.remoteAddress;
};

exports.testRemoteAddressValue = function testRemoteAddressValue (request, response) {	
	response.contentType = 'text/plain';	
	return request.remoteAddress;
};

exports.testRemotePortExists = function testRemotePortExists (request, response) {	
	response.contentType = 'text/plain';	
	return typeof request.remotePort;
};

exports.testRemotePortValue = function testRemotePortValue (request, response) {	
	response.contentType = 'text/plain';	
	return request.remotePort.toString();
};

exports.testLocalAddressExists = function testLocalAddressExists (request, response) {	
	response.contentType = 'text/plain';	
	return typeof request.localAddress;
};

exports.testLocalAddressValue = function testLocalAddressValue (request, response) {	
	response.contentType = 'text/plain';	
	return request.localAddress;
};

exports.testLocalPortExists = function testLocalPortExists (request, response) {	
	response.contentType = 'text/plain';	
	return typeof request.localPort;
};

exports.testLocalPortValue = function testLocalPortValue (request, response) {	
	response.contentType = 'text/plain';	
	return request.localPort.toString();
};

exports.testIsSSLExists = function testIsSSLExists (request, response) {	
	response.contentType = 'text/plain';	
	return typeof request.isSSL;
};

exports.testIsSSLValue = function testIsSSLValue (request, response) {	
	response.contentType = 'text/plain';	
	return request.isSSL.toString();
};
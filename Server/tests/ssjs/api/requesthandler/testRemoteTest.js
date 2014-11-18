/**

* @author admin

*/

var env = unitTest.getenv();

function ipMachine() {
	/*
		Should we add a new env variable to get the ip address of the current test machine (ipv4) ? 	
	*/
	var currentIp = '127.0.0.1';
	if (os.isMac) {
		try {
			var myIpWorker = SystemWorker.exec(env.SCRIPTPATH + '/getipmac.sh');
			currentIp = myIpWorker.output.toString().replace(/^\s+/g, '').replace(/\s+$/g, '');
		} catch (e) {
			currentIp = '127.0.0.1';
		}
	} else if (os.isLinux) {
		try {
			var myIpWorker = SystemWorker.exec(env.SCRIPTPATH + '/getiplinux.sh');
			currentIp = myIpWorker.output.toString().replace(/^\s+/g, '').replace(/\s+$/g, '');
		} catch (e) {
			currentIp = '127.0.0.1';
		}
	} else {
		try {
			var myIpWorker = SystemWorker.exec(env.SCRIPTPATH + '\\getipwin.bat');
			currentIp = myIpWorker.output.toString().split('\n')[2].replace(/^.*\.:/gim, '').replace(/^\s+/g, '').replace(/\s+$/g, '');
		} catch (e) {
			currentIp = '127.0.0.1';
		}
	}
	return currentIp;
};

var testCase = {

	name: 'Simple Remote tests',

	_wait: {

		after: 5000

	},

	_should: {

        ignore: {

        	

        }

    },

	testRemoteAddressExists: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testRemoteAddressExists');

		myXHR.send();

		Y.Assert.areSame('string', myXHR.responseText);

	},

	testRemotePortExists: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testRemotePortExists');

		myXHR.send();

		Y.Assert.areSame('number', myXHR.responseText);

	},

	testLocalAddressExists: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testLocalAddressExists');

		myXHR.send();

		Y.Assert.areSame('string', myXHR.responseText);

	},

	testLocalPortExists: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testLocalPortExists');

		myXHR.send();

		Y.Assert.areSame('number', myXHR.responseText);

	},

	testIsSSLExists: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testIsSSLExists');

		myXHR.send();

		Y.Assert.areSame('boolean', myXHR.responseText);

	},

	testRemoteAddressExists2: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testRemoteAddressExists');

		myXHR.send();

		Y.Assert.areSame('string', myXHR.responseText);

	},

	testRemotePortExists2: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testRemotePortExists');

		myXHR.send();

		Y.Assert.areSame('number', myXHR.responseText);

	},

	testLocalAddressExists2: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalAddressExists');

		myXHR.send();

		Y.Assert.areSame('string', myXHR.responseText);

	},

	testLocalPortExists2: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalPortExists');

		myXHR.send();

		Y.Assert.areSame('number', myXHR.responseText);

	},

	testIsSSLExists2: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testIsSSLExists');

		myXHR.send();

		Y.Assert.areSame('boolean', myXHR.responseText);

	},

	testRemoteAddressValueRemote: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testRemoteAddressValue');

		myXHR.send();

		Y.Assert.areSame('::ffff:192.168.7.25', myXHR.responseText);

	},

	testRemoteAddressValueLocal: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testRemoteAddressValue');

		myXHR.send();

		Y.Assert.areSame('::ffff:127.0.0.1', myXHR.responseText);

	},

	testRemotePortValueRemote: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testRemotePortValue');

		myXHR.send();

		Y.Assert.isTrue(parseInt(myXHR.responseText) >= 10000, 'remotePort should be >= 10000, actual value: ' + myXHR.responseText);

	},

	testRemotePortValueLocal: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testRemotePortValue');

		myXHR.send();

		Y.Assert.isTrue(parseInt(myXHR.responseText) >= 10000, 'remotePort should be >= 10000, actual value: ' + myXHR.responseText);

	},

	testLocalAddressValueRemote: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testLocalAddressValue');

		myXHR.send();

		Y.Assert.areSame('::ffff:' + ipMachine(), myXHR.responseText);

	},

	testLocalAddressValueLocal: function () {

		var url = ipMachine();

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalAddressValue');

		myXHR.send();

		Y.Assert.areSame('::ffff:127.0.0.1', myXHR.responseText);

	},

	testLocalPortValueRemote: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testLocalPortValue');

		myXHR.send();

		Y.Assert.areSame(8081, parseInt(myXHR.responseText));

	},

	testLocalPortValueLocal: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalPortValue');

		myXHR.send();

		Y.Assert.areSame(8081, parseInt(myXHR.responseText));

	},

	testIsSSLValueRemoteUnsecured: function () {

		var url = ipMachine() + ':8081';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=http://' + url + '/testIsSSLValue');

		myXHR.send();

		Y.Assert.areSame('false', myXHR.responseText);

	},

	testIsSSLValueLocalUnsecured: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://127.0.0.1:8081/testIsSSLValue');

		myXHR.send();

		Y.Assert.areSame('false', myXHR.responseText);

	},

	testIsSSLValueRemoteSecured: function () {

		var url = ipMachine() + ':8082';

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'http://192.168.7.25:8081/testRequest?url=https://' + url + '/testIsSSLValue');

		myXHR.send();

		Y.Assert.areSame('true', myXHR.responseText);

	},

	testIsSSLValueLocalSecured: function () {

		var myXHR = new XMLHttpRequest();

		myXHR.open('GET', 'https://127.0.0.1:8082/testIsSSLValue');

		myXHR.send();

		Y.Assert.areSame('true', myXHR.responseText);

	}

};
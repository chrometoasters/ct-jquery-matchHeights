 	// src: https://gist.github.com/oslego/2819653

 	// CT: create a test ID before using
 	// http://www.browserscope.org/user/tests/create
	// Test will be available here:
	// http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnINCxIEVGVzdBiFnYEUDA
	// Alternatively: look into Create a test record with the API on http://www.browserscope.org/api
	var ct_test_id = 'agt1YS1wcm9maWxlcnINCxIEVGVzdBiFnYEUDA';

	// To save data in Browserscope do something like the following.
	// The syntax is 'test_key': 'value' where test_key is some unique
	// identifier for a piece of data you want to store (no = or , allowed)
	// and value is a numeric value from 0 through 1000000000000.
	// Note: You can only send a maximum of 200 results in a beacon.
	var _bTestResults = {}

	// Add URL option in QUnit to toggle publishing results to BrowserScope.org
	QUnit.config.urlConfig.push("publishresults")

	// Timeout for async tests
	QUnit.config.testTimeout = 1000

	// Build-up the test results beacon for BrowserScope.org
	QUnit.testDone = function(test){

		// make sure all assertions passed successfully
		if (!test.failed && test.total === test.passed){
			_bTestResults[test.name] = 1
		}
		else{
			_bTestResults[test.name] = 0
		}
	}

	// If the user agreed to publish results to BrowserScope.org, go for it!
	QUnit.done = function(){

		QUnit.config.publishresults = true; // I think this is so that we could make this an option rather than doing it on the sly

		if (QUnit.config.publishresults){

			var testKey = ct_test_id,
			newScript = document.createElement('script'),
			firstScript = document.getElementsByTagName('script')[0];
			newScript.src = 'http://www.browserscope.org/user/beacon/' + testKey + "?callback=showResults";
			firstScript.parentNode.insertBefore(newScript, firstScript);
		}
	}

	// Load the results widget from browserscope.org
	// http://www.browserscope.org/api
	function showResults(){
		var script = document.createElement('script')
		script.src = "http://www.browserscope.org/user/tests/table/" + ct_test_id + "?o=js&v=top-d&highlight=1&w=" + ( $(window).width() - 50 );

		document.body.appendChild(script)
	}

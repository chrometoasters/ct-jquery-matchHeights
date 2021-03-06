// Unit tests for the matchHeights jQuery plugin
// Author: dan.smith@chrometoaster.com
// equal( test, expected value, string to display in output )
//
// ----------------------------------------------------------------

var testvars = {};

QUnit.begin( function() {

	testvars.container = '#qunit-fixture';

	testvars.match_1 = '.match-1';

});

module("Default state");

	test("Before run, items are not height matched", function() {

		// Setup
		// nothing
		var short_style = $('.short').attr('style');
		var medium_style = $('.medium').attr('style');
		var tall_style = $('.tall').attr('style');

		var short_height = $('.short').outerHeight();
		var medium_height = $('.medium').outerHeight();
		var tall_height = $('.tall').outerHeight();

		equal(
			( short_style === undefined && medium_style === undefined && tall_style === undefined ),
			true,
			'Style attributes not added'
		);

		equal(
			( short_height !== medium_height ),
			true,
			'.short height (' + short_height + 'px) does not match .medium height (' + medium_height + 'px)'
		);

		equal(
			( medium_height !== tall_height ),
			true,
			'.medium height (' + medium_height + 'px) does not match .tall height (' + tall_height + 'px)'
		);

		equal(
			( short_height !== tall_height ),
			true,
			'.short height (' + short_height + 'px) does not match .tall height (' + tall_height + 'px)'
		);

	});

	test("After run, items are height matched, by reading height and setting height", function() {

		// Setup
		var $match = $('.short').add( $('.medium') ).add( $('.tall') );
		$match.matchHeights({
			read: 'height',
			write: 'height',
			animation_duration_ms: 0
		});

		var short_style = $('.short').attr('style');
		var medium_style = $('.medium').attr('style');
		var tall_style = $('.tall').attr('style');

		var short_height = $('.short').height();
		var medium_height = $('.medium').height();
		var tall_height = $('.tall').height();

		equal(
			( short_style !== undefined && medium_style !== undefined && tall_style !== undefined ),
			true,
			'Style attributes added'
		);

		equal(
			( short_height === medium_height ),
			true,
			'.short height (' + short_height + 'px) matches .medium height (' + medium_height + 'px) ... (' + short_style + ' vs ' + medium_style + ')'
		);

		equal(
			( medium_height === tall_height ),
			true,
			'.medium height (' + medium_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + medium_style + ' vs ' + tall_style + ')'
		);

		equal(
			( short_height === tall_height ),
			true,
			'.short height (' + short_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + short_style + ' vs ' + tall_style + ')'
		);

	});

	test("After run, items are height matched, by reading outerHeight and setting height", function() {

		// Setup
		var $match = $('.short').add( $('.medium') ).add( $('.tall') );
		$match.matchHeights({
			read: 'outerHeight',
			write: 'height',
			animation_duration_ms: 0
		});

		var short_style = $('.short').attr('style');
		var medium_style = $('.medium').attr('style');
		var tall_style = $('.tall').attr('style');

		var short_height = $('.short').outerHeight();
		var medium_height = $('.medium').outerHeight();
		var tall_height = $('.tall').outerHeight();

		equal(
			( short_style !== undefined && medium_style !== undefined && tall_style !== undefined ),
			true,
			'Style attributes added'
		);

		equal(
			( short_height === medium_height ),
			true,
			'.short height (' + short_height + 'px) matches .medium height (' + medium_height + 'px) ... (' + short_style + ' vs ' + medium_style + ')'
		);

		equal(
			( medium_height === tall_height ),
			true,
			'.medium height (' + medium_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + medium_style + ' vs ' + tall_style + ')'
		);

		equal(
			( short_height === tall_height ),
			true,
			'.short height (' + short_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + short_style + ' vs ' + tall_style + ')'
		);

	});

	test("After run, items are height matched, by reading height and setting min-height", function() {

		// Setup
		var $match = $('.short').add( $('.medium') ).add( $('.tall') );
		$match.matchHeights({
			read: 'height',
			write: 'min-height',
			animation_duration_ms: 0 // else test fails as height is read before the new height as been transitioned to
		});

		var short_style = $('.short').attr('style');
		var medium_style = $('.medium').attr('style');
		var tall_style = $('.tall').attr('style');

		var short_height = $('.short').height();
		var medium_height = $('.medium').height();
		var tall_height = $('.tall').height();

		equal(
			( short_style !== undefined && medium_style !== undefined && tall_style !== undefined ),
			true,
			'Style attributes added'
		);

		equal(
			( short_height === medium_height ),
			true,
			'.short height (' + short_height + 'px) matches .medium height (' + medium_height + 'px) ... (' + short_style + ' vs ' + medium_style + ')'
		);

		equal(
			( medium_height === tall_height ),
			true,
			'.medium height (' + medium_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + medium_style + ' vs ' + tall_style + ')'
		);

		equal(
			( short_height === tall_height ),
			true,
			'.short height (' + short_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + short_style + ' vs ' + tall_style + ')'
		);

	});

	test("After run, items are height matched, by reading outerHeight and setting min-height", function() {

		// Setup
		var $match = $('.short').add( $('.medium') ).add( $('.tall') );
		$match.matchHeights({
			read: 'outerHeight',
			write: 'min-height',
			animation_duration_ms: 0 // else test fails as height is read before the new height as been transitioned to
		});

		var short_style = $('.short').attr('style');
		var medium_style = $('.medium').attr('style');
		var tall_style = $('.tall').attr('style');

		var short_height = $('.short').outerHeight();
		var medium_height = $('.medium').outerHeight();
		var tall_height = $('.tall').outerHeight();

		equal(
			( short_style !== undefined && medium_style !== undefined && tall_style !== undefined ),
			true,
			'Style attributes added'
		);

		equal(
			( short_height === medium_height ),
			true,
			'.short height (' + short_height + 'px) matches .medium height (' + medium_height + 'px) ... (' + short_style + ' vs ' + medium_style + ')'
		);

		equal(
			( medium_height === tall_height ),
			true,
			'.medium height (' + medium_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + medium_style + ' vs ' + tall_style + ')'
		);

		equal(
			( short_height === tall_height ),
			true,
			'.short height (' + short_height + 'px) matches .tall height (' + tall_height + 'px) ... (' + short_style + ' vs ' + tall_style + ')'
		);

	});

module("Destroy");

	//test("$('" + testvars.treeitem + "').tree()", function() {
	test("Markup reverts to default state", function() {

		// Setup
		var $match = $('.short').add( $('.medium') ).add( $('.tall') );

		$match.matchHeights({
			read: 'outerHeight',
			write: 'min-height'
		});

		$match.matchHeights('destroy');

		var short_style = $('.short').attr('style');
		var medium_style = $('.medium').attr('style');
		var tall_style = $('.tall').attr('style');

		var short_height = $('.short').outerHeight();
		var medium_height = $('.medium').outerHeight();
		var tall_height = $('.tall').outerHeight();

		equal(
			( short_style === undefined && medium_style === undefined && tall_style === undefined ),
			true,
			'Style attributes stripped'
		);

		equal(
			( short_height !== medium_height ),
			true,
			'.short height (' + short_height + 'px) does not match .medium height (' + medium_height + 'px)'
		);

		equal(
			( medium_height !== tall_height ),
			true,
			'.medium height (' + medium_height + 'px) does not match .tall height (' + tall_height + 'px)'
		);

		equal(
			( short_height !== tall_height ),
			true,
			'.short height (' + short_height + 'px) does not match .tall height (' + tall_height + 'px)'
		);

	});

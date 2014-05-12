/*
 * File name: ct-jquery-matchHeights.js
 * Plugin name: matchHeights
 * Project name: Build (2014)
 *
 * Summary:
 * Markup:
 * Usage:
 *
 * Plugin architecture:
 * http://docs.jquery.com/Plugins/Authoring
 * + read: http://stackoverflow.com/questions/5162120/sharing-settings-across-methods-in-namespaced-jquery-plugin
 * + read: http://extraordinarythoughts.com/2011/08/20/understanding-jquery-plugins/
 * + read: http://blog.kevinchisholm.com/javascript/javascript-immediate-functions-basics/
 * + read: http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 * + read: http://jqfundamentals.com/chapter/jquery-basics
 * TO READ: http://www.virgentech.com/blog/2009/10/building-object-oriented-jquery-plugin.html
 *
*/

    // IMMEDIATE FUNCTION
    // (function($) {..}(jQuery))
    //
    // This 'immediate' function aka IIFE (Immediately Invoked Function Expression)
    // executes as soon as it is defined; it is followed by (), then wrapped in ();
    //
    // The enclosure in parenthesis makes everything inside the function run within a local scope.
    // This means that public variables like 'jQuery' are inaccessible, so we pass this in as an argument,
    // and map it to '$' (valid names in JavaScript can be pretty much anything, as long as they don't begin with a number and don't include a hyphen),
    // so it can't be overwritten by another library (such as Prototype) in the scope of its execution.
    //
    // Wrapping the entire plugin definition in a function create a closure,
    // allowing us to define private functions, without cluttering the namespace and without exposing the implementation.
    // aka In JavaScript, if you use the function keyword inside another function, you are creating a closure.

    (function($) {

        // VALIDATION SETTINGS FOR JSHINT.COM
        // This file
        /*jshint browser:true, jquery:true, strict:true, devel:true */

        // Allow specified vars from other files
        "use strict";

        var globals = {
            min_height: 0,
            max_height: 0
        };

        // NAMESPACING:
        // This type of plugin architecture allows you to encapsulate all of your methods
        // in the plugin's parent closure, and call them by first passing the string name
        // of the method, and then passing any additional parameters you might need for that method.
        // This type of method encapsulation and architecture is a standard in the jQuery plugin community
        // and it used by countless plugins, including the plugins and widgets in jQueryUI.
        //
        // Define a JSON object 'methods' to store public methods.
        var methods = {

            // called with $(el).matchHeights()
            init : function( options ) {

                // Create settings, regardless of whether they were already set
                var defaults = {
                    read: 'height', // height || outerHeight
                    write: 'min-height', // min-height || height
                    tabs_selector: $('#tabs'),
                    rerun_on_every_tab_change: false, // false || true
                    animation_duration_ms: 250 // number (0 = off)
                };

                var settings = $.extend({}, defaults, options);

                // prevent previous height manipulation from affecting a recalculation
                globals.min_height = 0;
                globals.max_height = 0;

                // Note: removed legacy behaviour within jQuery UI tabbed container:
                // https://github.com/chrometoasters/ct-jquery-matchHeights/commit/8f7cdd81c7432988fca1df5ab214bcff337a24b2

                // MAINTAIN CHAINABILITY by returning 'this'
                // Within the function called by 'each()', the individual element being processed
                // can be referenced in the local scope by 'this' and used as a jQuery object by '$(this)'
                this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this); // 'this' means a single element in the collection

                    // DATA
                    // it's best to use a single object literal to house all of your variables, and access that object by a single data namespace.
                    // Attempt to grab saved settings, if they don't exist we'll get 'undefined'.
                    // Note: this is the alternative approach to define an 'options' variable with/before 'methods'
                    // so that it is available to other functions inside the closure.
                    //
                    // To set data:
                    // 1.  $context.data('matchHeights').NEW_PROPERTY_NAME = 'VALUE';
                    // 2a. $context.data('matchHeights').NEW_PROPERTY_SET = {};
                    // 2b. $context.data('matchHeights').PROPERTY_SET.NEW_PROPERTY_NAME = 'BAR';
                    //
                    // To retrieve data:
                    // 1.  $context.data('matchHeights').EXISTING_PROPERTY_NAME
                    // 2a. $context.data('matchHeights').EXISTING_PROPERTY_SET;
                    // 2b. $context.data('matchHeights').EXISTING_PROPERTY_SET.EXISTING_PROPERTY_NAME;
                    //var settings = $this.data('matchHeights');

                    // Save our newly created settings with each element
                    $this
                        .data('matchHeights', settings);

                    // RUN CODE HERE
                    // do something to $this
                    $this
                        .matchHeights('_calculate_heights');

                });

                return this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this);

                    $this
                        .matchHeights('_set_heights');

                });
            },

            // CLEANING UP
            destroy: function() {

                this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this);

                    $this
                        .removeAttr('style') // Remove inline height style
                        .removeData('matchHeights') // Remove data when deallocating our plugin
                        .removeClass('js-match-heights'); // Remove flag

                });
            },

            // called by $(el).matchHeights('set_heights') or $(el).matchHeights('set_heights', ARGUMENTS);
            _calculate_heights: function() {

                var $this = $(this),
                    data = $this.data('matchHeights'),
                    calculated_height = 0,
                    old_style = $this.attr('style'); // store the current height; note that the original height is redundant as we may have shifted breakpoints

                // if the element has already been resized, an inline height will have been set
                if ( old_style ) {
                    $this.removeAttr('style'); // remove the applied new height so that the actual height can be calculated
                }

                // calculate the actual current height
                if ( data.read === 'height' ) {
                    calculated_height = $this.height();
                }
                else if ( data.read === 'outerHeight' ) {
                    calculated_height = $this.outerHeight();
                }

                if ( old_style ) {
                    $this.attr('style', old_style); // reinstate the old style so we can make the transition from it to the new style
                }

                // NOTE: when transitioning between breakpoints,
                // a timeout is required to ensure that the layout has updated
                // as this can effect the element width
                // which in turn can affect the element height

                // if this item is the tallest so far, update the global value
                if ( calculated_height > globals.max_height ) {
                    globals.max_height = calculated_height;
                }

                // increase the minimum height to match the tallest item so far
                globals.min_height = globals.max_height;
            },

            _set_heights: function() {

                var $this = $(this),
                    data = $this.data('matchHeights');

                // prevent previous height manipulation from affecting a recalculation
                if ( data.animation_duration_ms > 0 ) {
                    $this.matchHeights('_animate_height_change');
                }

                if ( data.write === 'height' ) {
                    $this.css('height', globals.min_height);
                }
                else if ( data.write === 'min-height' ) {
                    $this.css('min-height', globals.min_height);
                }

                // the new height matches the tallest item in the row
                data.new_height = globals.min_height;

                // flag as done (but don't check for this, in case we want to run it again later - eg on text resize)
                $this.addClass('js-match-heights');

            }, // END METHOD

            _animate_height_change: function() {

                var $this = $(this),
                    data = $this.data('matchHeights'),
                    transition = 'all ' + ( data.animation_duration_ms / 1000) + 's linear'; // 'height' and 'min-height' didn't work in Chrome

                $this.css({
                    WebkitTransition : transition,
                    MozTransition    : transition,
                    MsTransition     : transition,
                    OTransition      : transition,
                    transition       : transition
                });

                transition = '';

                // after the transition is complete remove it
                // this prevents the transition from being present and triggered when the style is removed for recalculation
                setTimeout( function() {
                    $this.css({
                        WebkitTransition : transition,
                        MozTransition    : transition,
                        MsTransition     : transition,
                        OTransition      : transition,
                        transition       : transition
                    });
                }, data.animation_duration_ms);

            }

        }; // end methods

        // Add a new (public) function property named 'matchHeights' to the jQuery.fn object:
        // $.fn.matchHeights = function(){ .. }
        //
        // Every jQuery plugin is essentially a large function we add to jQuery's protected 'fn' namespace.
        // We could easily assign our function using “jQuery.pluginName = function”, but then our plugin’s code wouldn’t be protected.
        // So we use “jQuery.fn” as a shortcode to “jQuery.prototype”, meaning it can only be read (and not modified)
        // when using the jQuery namespace to access it.
        $.fn.matchHeights = function( method ) {

            // Method calling logic from http://docs.jquery.com/Plugins/Authoring
            if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            }
            else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            }
            else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.matchHeights' );
            }

        };

    })(jQuery);

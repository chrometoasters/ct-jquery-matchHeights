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

                // MAINTAIN CHAINABILITY by returning 'this'
                // Within the function called by 'each()', the individual element being processed
                // can be referenced in the local scope by 'this' and used as a jQuery object by '$(this)'
                this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this);

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
                    var settings = $this.data('matchHeights');

                    // If we could't grab settings, create them from defaults and passed options
                    if ( typeof(settings) === 'undefined') {

                        var defaults = {
                            read: 'height', // height || outerHeight
                            write: 'min-height', // min-height || height
                            resetStyle: false, // false || true
                            tabs_selector: $('#tabs'),
                            rerun_on_every_tab_change: false
                        };

                        settings = $.extend({}, defaults, options);

                        // Save our newly created settings
                        $this.data('matchHeights', settings);

                    } else {

                        // We got settings, merge our passed options in with them (optional)
                        settings = $.extend({}, settings, options);

                        // If you wish to save options passed each time, add:
                        // $this.data('pluginName', settings);
                    }

                    // RUN CODE HERE
                    // do something to $this
                    $this.matchHeights('_calculate_heights');

                });

                return this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this);

                    $this.matchHeights('_set_heights');

                });
            },

            // CLEANING UP
            destroy: function() {

                this.each( function() {

                    // Create a jQuery object to use with this individual element
                    var $this = $(this);

                    // Remove data when deallocating our plugin
                    //data.remove();

                    $this
                        .removeAttr('style')
                        .removeData('matchHeights')
                        .removeClass('js-match-heights');

                });
            },

            // called by $(el).matchHeights('set_heights') or $(el).matchHeights('set_heights', ARGUMENTS);
            _calculate_heights: function() {

                var $this = $(this),
                    item_height = 0,
                    data = $this.data('matchHeights');

                if ( data.resetStyle ) {
                    $this.removeAttr('style');
                }

                if ( data.read === 'height' ) {
                    item_height = $this.height();
                }
                else if ( data.read === 'outerHeight' ) {
                    item_height = $this.outerHeight();
                }

                if ( item_height > globals.max_height ) {
                    globals.max_height = item_height;
                }

                globals.min_height = globals.max_height;

                data.old_height = item_height;
            },

            _set_heights: function() {

                var $this = $(this),
                    data = $this.data('matchHeights');

                if ( data.write === 'height' ) {
                    $this.css('height', globals.min_height);
                }
                else if ( data.write === 'min-height' ) {
                    $this.css('min-height', globals.min_height);
                }

                // mark as done (but don't check for this, in case we want to run it again later - eg on text resize)
                $this.addClass('js-match-heights');

            } // END METHOD

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

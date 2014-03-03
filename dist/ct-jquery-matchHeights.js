/*
* @@ matchHeights
* Match the display heights of all elements in a collection
*
* $('div.container h3').matchHeights();
*
* Note that this script does not adjust for internal padding, as:
* - http://reference.sitepoint.com/css/height
*   ".. does not include padding, borders, or margins — see The CSS Box Model."
* - http://api.jquery.com/height/
*   The illustration does not including padding.
*/

(function($) {

    /*jshint browser:true, jquery:true, strict:true, devel:true */
    "use strict";

    $.fn.matchHeights = function( rerun ) {

        // PLUGIN VARS
        var options = {
            max_height: 0,
            min_height: 0,
            tabs_selector: $('#tabs'),
            rerun_on_every_tab_change: false
        };

        // SAVE A REFERENCE TO THE SELECTOR
        var $selector = $(this);

        // RERUN IF CONTENT IS INITIALLY HIDDEN
        // TODO: everyrthing runs ok first page load in IE8
        // but on page refresh nothing runs :-(
        // not sure if the cause is in this script or not..

            //alert('first run');

            // if the matchHeights selector/set is within a tabs container
            var $tabs = $selector.parents(options.tabs_selector);

            if ( $tabs.length ) {

                // if the parent tab is hidden
                var $parent_tab = $selector.parents('div.ui-tabs-panel');

                if ( $parent_tab.hasClass('ui-tabs-hide') ) {

                    // set a flag to indicate that match heights needs to be run again when the tab is shown
                    $parent_tab.data('matchHeights_onchange', true );

                    // ONLY ADD THE TABSSHOW BINDINGS ONCE
                    if ( ! rerun ) {

                        // when the selected tab is changed
                        $tabs.bind( 'tabsshow', function() {

                            //alert( 'tabsshow' );

                            // if the parent tab is now visible
                            if ( ! $parent_tab.hasClass('ui-tabs-hide') && $parent_tab.data('matchHeights_onchange') ) {

                                // if we only want to rerun matchHeights once, remove the flag
                                if ( ! options.rerun_on_every_tab_change ) {
                                    $parent_tab.removeData('matchHeights_onchange');
                                }

                                // rerun matchHeights
                                $selector.matchHeights( true );
                            }
                        });
                    }
                }
        }

        // PLUGIN LOOP
        // note that the return is after the loop,
        // as we need to apply the calculated max_height to all elements in the selector collection
        this.each(function() {

            var $this = $(this),
                    item_height = $this.height();

            if ( item_height > options.max_height ) {
                options.max_height = item_height;
            }

            options.min_height = options.max_height;

            // mark as done (but don't check for this, in case we want to run it again later - eg on text resize)
            $this.data('matchHeights', {
                old_height: item_height,
                min_height: options.min_height
            });

            $this.addClass('js-match-heights');

        });
        // end plugin loop

        // RETURN HERE TO ALLOW CHAINING,
        // applying max_height to all in selector collection

        // height for IE6 and below
        // note: jQuery.browser is deprecated
        //if ( $.browser.msie && $.browser.version < 7 ) {
        //    return this.css('height', options.min_height);
        //}
        //else {
            return this.css('min-height', options.min_height);
        //}

    };
})(jQuery);
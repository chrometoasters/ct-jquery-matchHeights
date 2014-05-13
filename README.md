# jQuery: matchHeights

A jQuery plugin to create horizontal alignment.

__Please note: this plugin is optimised for internal Chrometoaster use. YMMV.__

## Installation

1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `bower install https://github.com/chrometoasters/ct-jquery-matchHeights.git#v2.1.1 --save`

Note: if you wish to customise where Bower puts installed components, you may add a `.bowerrc` file into this folder:

        {
            "directory" : "PATH/TO/COMPONENTS"
        }

## Usage

        $element.matchHeights({
            read: 'outerHeight', // height || outerHeight
            write: 'min-height', // min-height || height
            animation_duration_ms: 250 // number (0 = off)
        });

Please view the <a href="https://rawgithub.com/chrometoasters/ct-jquery-matchHeights/master/demos/matchHeights.html">demo</a>.

[![Build Status](https://travis-ci.org/falsecz/beer-script.png?branch=master)](undefined)

                                      ____     
                                     |  _ \    
     .- ----------- -.               | |_) | ___  ___ _ __ 
    (  (.} {.} {.} }  )              |  _ < / _ \/ _ \ '__|
    |`-..________ ..-'|              | |_) |  __/  __/ | 
    |                 |              |____/ \___|\___|_|   
    |                 ;--.
    |                (__  \            _____           _       _
    |                 | )  )          / ____|         (_)     | |
    |                 |/  /          | (___   ___ _ __ _ _ __ | |_
    |                 (  /            \___ \ / __| '__| | '_ \| __|
    |                 |/              ____) | (__| |  | | |_) | |_
    |                 |              |_____/ \___|_|  |_| .__/ \__|
     `-.._________..-'                                  | |
                                                        |_|

												
  * support for @_private
  * support for @[$private + 'private']
  * support for goog.provide via --goog switch
  * include goog.dom as dom via --goog switch
  * auto include base class
  * support for enumeration
  * support for uses (mixins) [experimental]



```coffee
include goog.dom as dom
include builder.ui.Component as bui

class builder.ui.ColumnLayout extends goog.ui.Component
  constructor: ->
    dom.getElementByClass 'xxx'
    
    
enumeration builder.ui.ColumnLayout.ORIENTATION
   VERTICAL: 'vertical'
   HORIZONTAL: 'horizontal'
   

class builder.ui.Tree extends goog.ui.Component uses builder.mixins.repository
  
```

```javascript
goog.provide('builder.ui.ColumnLayout');
goog.provide('builder.ui.ColumnLayout.ORIENTATION');

goog.require('builder.ui.Component');
goog.require('goog.dom');

goog.scope(function () {
    var bui = builder.ui.Component;
    var dom = goog.dom;


    builder.ui.ColumnLayout = (function (_super) {
        var $private;

        __extends(ColumnLayout, _super);

        $private = '$builder_ui_ColumnLayout_';

        function ColumnLayout() {
            dom.getElementByClass('xxx');
        }

        return ColumnLayout;

    })(goog.ui.Component);

    builder.ui.ColumnLayout.ORIENTATION = {
        VERTICAL: 'vertical',
        HORIZONTAL: 'horizontal'
    };

}); // close goog.scope()
```



  ----------------------------------------------------------------

  CoffeeScript is a little language that compiles into JavaScript.

  Install Node.js, and then the CoffeeScript compiler:
  sudo bin/cake install

  Or, if you have the Node Package Manager installed:
  npm install -g coffee-script
  (Leave off the -g if you don't wish to install globally.)

  Execute a script:
  coffee /path/to/script.coffee

  Compile a script:
  coffee -c /path/to/script.coffee

  For documentation, usage, and examples, see:
  http://coffeescript.org/

  To suggest a feature, report a bug, or general discussion:
  http://github.com/jashkenas/coffee-script/issues/

  If you'd like to chat, drop by #coffeescript on Freenode IRC,
  or on webchat.freenode.net.

  The source repository:
  git://github.com/jashkenas/coffee-script.git

  All contributors are listed here:
  http://github.com/jashkenas/coffee-script/contributors

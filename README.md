angular-boilerplate
===================

A boilerplate for modular projects using requirejs for files dependency and angular, based on ng-boilerplate trying to reduce it's size

### Getting started

Requires node and npm installed. Tested with node `0.10.19`.
Execute: `npm install && node_modules/.bin/bower install`

To develop execute `grunt` on the project directory and start writing the code with the terminal open. Every lint or test error should appear there.

### Grunt tasks:

  - `grunt watch` **(default)**: Listens for
    - app's js files and lint, test and re-build the `out.js` file
    - test files and lint and executes karma tests
    - less files and re-builds the `out.css` file
    - config files and lints them

  - `grunt build-app`:
    - Lint the app code
    - Run tests (disabled, see `Gruntfile.js` line 212)
    - Resolve files dependencies
    - Prepare angular dependency injection for minify
    - Minify the code (disabled, see `Gruntfile.js` line 215)

  - `grunt build-less`:
    - Process less to css
    - Add vendor-specific prefixes
    - Minify css (disabled, see `Gruntfile.js` line 206)

  - `grunt build`: This builds `out.js` and `out.css` files
  - `grunt test`: executes karma
  - `grunt lint`: Lints every js file


### Directory structure

Files are organized by modules, each module can contain one or more js file, test file, less file and/or templates.

App-specific modules should be placed at '/app/module-name'.
Reusable components modules should be placed at '/components/component-name'.

Each module and/or component should work by including it's main file. The main files (js and less) should be named as the module itself

    app/
      dashboard/
        dashboard.js
        dashboard.less
        ...

    components/
      file-upload/
        file-upload.js
        file-upload.less
        ...

The main js file should load the required extra files and templates, the same way the main less file should load the rest of less files required.

For components shared with other projects I reccomend the component have it's own repository and add it as a sub-module to this project.

### Testing

Every `.test.js` file found at `app` or `components` folders will be added to the test suite. This file should import the files it needs in order to work.

At `karma.conf.js` you can tune the test engine.

For testing it uses `mocha`, `sinon` and `chai`. Sinon and chai should be imported by `require` when needed:

    // app/my-module/my-module.test.js
    define(function(require)) {
      'use strict';
      var sinon = require('sinon');
      var assert = require('chai').assert;

      describe('Some case', function() {
        it('should do something', function() {
          assert(true, ':)');
        });
      });
    });


### Importing

Every module should load all it's dependencies except for angular, every module should work including just it's main file.
**When importing between modules you should always include only the module's main file.**

#### From javascript

To import an app module from app-entry point, another module or test just require only the main file

    define(function(require) {
    	'use strict';
    	var dashboard = require('dashboard/dashboard');
	});

You will find the components modules at the `component` folder from requirejs from app-entry point, another module or test.

    define(function(require) {
    	'use strict';
    	var fileUpload = require('component/file-upload/file-upload');
	});

#### From LESS

From less you can access app modules and components modules just by it's name

For example, to add an app module style just import the module main file from `app/main.less`, or from another module:

    @import "dashboard/dashboard.less";

To import an component module style from your app or from anoter module just import it by the module name

    @import "file-upload/file-upload.less";

angular-boilerplate
===================

A boilerplate for angular projects, based on ng-boilerplate trying to reduce it's size

### Getting started

To develop execute `grunt` on the project directory and start writing the code with the terminal open. Every lint or test error should appear there.

### Grunt tasks:

  - `grunt watch` **(default)**: Listens for
    - app's js files and lint, test and re-build the `out.js` file
    - test files and lint and executes karma tests
    - less files and re-builds the `out.css` file
    - config files and lints them

  - `grunt build-app`:
    - Lint the app code
    - Run tests
    - Resolve files dependencies
    - Prepare angular dependency injection for minify
    - Minify the code

  - `grunt build-less`:
    - Process less to css
    - Add vendor-specific prefixes
    - Minify css

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

### Importing

Every module should load all it's dependencies except for angular, every module should work including just it's main file.

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

At less all routes are relative to the `.less` than contains the import.
When importing between modules you should always include only the module's main file.

For example, to add an app module style to the app we add this sentence to `main.less`

    @import "dashboard/dashboard.less";

To import an app module style from another app module you should add a relative require to your module's main less file.

    @import "../dashboard/dashboard.less";

To import an component module style from your app

    @import "../components/file-upload/file-upload.less";

To import an component module style from one of your app modules

    @import "../../components/file-upload/file-upload.less";

And to import a component module style from another component module

    @import "../file-upload7file-upload.less";

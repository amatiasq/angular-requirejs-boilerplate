Angular - RequireJS
===================

A boilerplate for SPAs than use AMD as modules and AngularJS for views.

### Getting started

Just clone this repo and run

    bower install

To download the client dependencies.
**You can start developing now.**

### Tokens

Almost every UPERCASE_TEXT you see on this app is ment to be replaced by your app's specific names:

- `APP_NAME`: A simple name for your app, for the page title I use "Something Like This" but for the angular module I usually create a prefixed, lower-cased slash-separated name `mq-myapp`
- `MODULE_NAME`: This structure is ment to have as many modules (components). I understand the module name is repeated a lot but I found this the simpler solution. Any other solution I tried caused me more problems.
- `SOME_X`: There are a lot of `SOME_`, `SOME_DIRECTIVE`, `SOME_FILTER`, `SOME_TOOL`... be creative there :)

Also `bower.json` and `package.json` have tokens you may want to configure.

### RequireJS config

RequireJS uses the same configuration file for development and for production, it's `app/config.js`. Grunt configuration add some more options on top of it. For example, to use the minified versions of angular.

### Build

In order to build you'll need build dependencies, to download them run

    npm install

You can build the bolerplate code as it is to how the optimization works.

This project is configured to build all the Javascript and the templates into `build/out.js` and the LESS stylesheets into `build/out.css'. You can find and modify all the build configuration on the `guntfile.js` file.

You'll find on Grunt's config than jshint check is disabled on build process. That is because the boilerplate breakes some rules (unused varables, UPPERCASE_IDENTIFIERS...). Remember to un-comment it as you build your app.

### Dev-only code

> WARNING: This is a tool to use when everything else fails, there is nothing more dangerous than to have differences on the code you can read and the optimized code. Use at your own risk.

You'll find on the code conditionals based on `DEBUG` variable:

    // app/angular-module.js
    if (!DEBUG) {
      deps.push('app-templates');
    }

On development phase this variable will be `true`, on production this variable will be `false`.

Actually the optimizer will remove all this conditionals as it knows this variable will be `false`. The optimizer will also remove console.log instructions so the production code will be silent. All this configurations can be modified on `gruntfile.js`.

### Feedback

This is a structure I have to create again and again for my projects so I create this repo to fork it a lot. If it's useful for you I'll be happy, don't hesitate to fork it or to create issues with your ideas or just to blame it ;)

---
A. Matías Quezada
@amatiasq

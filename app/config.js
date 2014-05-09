window.DEBUG = true;

requirejs.config({

  baseUrl: '',

  paths: {
    // vendors
    'angular-core': 'bower_components/angular/angular',
    'angular': 'bower_components/angular-route/angular-route',

    // aliases
    'app-module': 'app/angular-module',
  },

  shim: {
    'angular': {
      deps: [ 'angular-core' ],
      exports: 'angular',
    }
  }

})([ 'app/app' ]);

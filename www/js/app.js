(function(){
  'use strict';
  angular
  .module('duckface-app', [
    'ionic',
    'controllers',
    'services',
    'ionic-material',
    'ngCordova'
  ])

  .constant('HOST', 'http://localhost:8080/api')


  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

})();
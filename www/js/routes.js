(function() {
    'use strict';

    angular
        .module('duckface-app')
        .config(Config);

    function Config($stateProvider, $urlRouterProvider,$httpProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl',
            resolve: {
              init : function(DUAL) {
                return DUAL.init();
              }
            }
          }
        }
      })

      .state('tab.words', {
        url: '/words',
        views: {
          'tab-words': {
            templateUrl: 'templates/tab-words.html',
            controller: 'WordsCtrl',
            resolve: {
              init : function(WORDS) {
                return WORDS.init();
              }
            }
          }
        }
      })

      .state('tab.chats', {
          url: '/chats',
          views: {
            'tab-chats': {
              templateUrl: 'templates/tab-chats.html',
              controller: 'ChatsCtrl'
            }
          }
        })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('start',{
        url:'/start',
        templateUrl: 'templates/start.html'
      })

      .state('signin',{
        url:'/signin',
        abstract:true,
        templateUrl: 'templates/signin.html'
      })

      .state('signin.first',{
        url:'/first',
        views:{
          'signin-first': {
            templateUrl: 'templates/signin/first.html'
          }
        }
      })

      .state('signin.second',{
        url:'/second',
        views:{
          'signin-second': {
            templateUrl: 'templates/signin/second.html'
          }
        }
      })

      .state('login',{
        url:'/login',
        templateUrl: 'templates/login.html'
      });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/tab/dash');

      $httpProvider.interceptors.push('AuthInterceptorRequet');

    };

})();
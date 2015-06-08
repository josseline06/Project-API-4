(function(){

  'use strict';

  angular.module('services', [])

  .factory('DUAL', function($http, HOST) {

    var tweets = [];

    var page = 1;

    return {
      init: function() {
        return $http.get(HOST + '/dual/' + '?page=' + page).then(function(data) {
          tweets = data.data;
        }, function(data) {
          console.log('Something went wrong ' + data.status);
        });
      },
      loadMore: function() {
        page++;

        return $http.get(HOST + '?page=' + page).then(function(data) {
          tweets = tweets.concat(data.data);
        }, function(data) {
          page--;
          console.log('Something went wrong ' + data.status);
        });

      },
      all: function() {
        return tweets;
      },
      remove: function(tweet) {
        tweets.splice(tweets.indexOf(tweet), 1);
      },
      get: function(tweetId) {
        for (var i = 0; i < tweets.length; i++) {
          if (tweets[i].id === parseInt(tweetId)) {
            return tweets[i];
          }
        }
        return null;
      }
    };
  })

  .factory('WORDS', function($http, HOST) {

    var words = [];

    var page = 1;

    return {
      init: function() {
        return $http.get(HOST + '/words/' + '?page=' + page).then(function(data) {
          words = data.data;
        }, function(data) {
          console.log('Something went wrong ' + data.status);
        });
      },
      loadMore: function() {
        page++;

        return $http.get(HOST + '?page=' + page).then(function(data) {
          words = words.concat(data.data);
        }, function(data) {
          page--;
          console.log('Something went wrong ' + data.status);
        });

      },
      all: function() {
        return words;
      },
      remove: function(word) {
        words.splice(words.indexOf(word), 1);
      },
      get: function(wordId) {
        for (var i = 0; i < words.length; i++) {
          if (words[i].id === parseInt(wordId)) {
            return words[i];
          }
        }
        return null;
      }
    };
  });


})();

(function(){

  'use strict';

  angular

  .module('controllers', [])

  .controller('DashCtrl', DashCtrl)

  .controller('WordsCtrl', WordsCtrl)

  .controller('ChatsCtrl', ChatsCtrl)

  .controller('ChatDetailCtrl', ChatDetailCtrl)

  .controller('AccountCtrl', AccountCtrl);

  function DashCtrl ($scope, DUAL){

    $scope.tweets = DUAL.all();

    $scope.remove = function(tweet) {
      DUAL.remove(tweet);
    };

    $scope.loadMore = function() {
      DUAL.loadMore().then(function() {
        $scope.tweets = DUAL.all();
      }, function() {});
    };

  }

  function WordsCtrl ($scope, WORDS){

    $scope.words = WORDS.all();

    $scope.remove = function(word) {
      WORDS.remove(word);
    };

    $scope.loadMore = function() {
      WORDS.loadMore().then(function() {
        $scope.words = WORDS.all();
      }, function() {});
    };

  }

  function ChatsCtrl ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    }
  }

  function ChatDetailCtrl ($scope, $stateParams, Chats) {

      $scope.chat = Chats.get($stateParams.chatId);
      
  }

  function AccountCtrl ($scope) {

    $scope.settings = {
      enableFriends: true
    };

  }

})();

(function(){

  'use strict';

  angular

  .module('controllers', [])

  .controller('DashCtrl', DashCtrl)

  .controller('WordsCtrl', WordsCtrl)

  .controller('ChatsCtrl', ChatsCtrl)

  .controller('ChatDetailCtrl', ChatDetailCtrl)

  .controller('AccountCtrl', AccountCtrl)

  .controller('LoginCtrl', LoginCtrl)

  .controller('StartCtrl',StartCtrl)

  .controller('SigninCtrl',SigninCtrl);

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

  function AccountCtrl ($scope, $http , $window) {
    
    $http
      .get("http://192.168.43.126:8080/api"+"/users/"+$window.sessionStorage.username)

      .success(function (data, status, headers, config) {

        $scope.user = data;
        console.log(data);

      })

      .error(function (data, status, headers, config) {
        console.log(data)
      });

  }

  function LoginCtrl($scope, $http, $window, $location, $ionicPopup){
    $scope.user = {};

    $scope.login = function () {
      $http
        .post("http://192.168.43.126:8080/api"+"/authenticate", $scope.user)

        .success(function (data, status, headers, config) {

          console.log(status);

          $window.sessionStorage.token = data.token;
          $window.sessionStorage.username = $scope.user.username;
          $scope.isAuthenticated = true;
          $location.path("/");

        })

        .error(function (data, status, headers, config) {

          delete $window.sessionStorage.token;
          $scope.isAuthenticated = false;

          $scope.error = {title : "Error" , template : "La contraseña o el usuario son inválidos"};
          $scope.showAlert($scope.error);

          $scope.user.username = "";
          $scope.user.password = "";
        });
    };

    $scope.showAlert = function (errorMsg) {

        var alertPopup = $ionicPopup.alert(errorMsg);

    };

    $scope.goToRegister = function () {
        $location.path('/signin');
    };
  }

  function StartCtrl($scope, $location){
    $scope.a = {};
  }

  function SigninCtrl($scope, $http, $window, $location, $ionicPopup){
    $scope.registration = {};


    $scope.signin = function(){
      $http
        .post("http://192.168.43.126:8080/api"+"/users", $scope.registration)

        .success(function (data, status, headers, config) {

          console.log(status);
          $scope.showAlert({title:"Bienvenido",template:data.message});
          $location.path("/");

        })

        .error(function (data, status, headers, config) {

          console.log(data)
          $scope.error = {title : "Error" , template : "No se pudo crear el usuario"};
          $scope.showAlert($scope.error);

          $scope.user.username = "";
          $scope.user.password = "";
        });
    };

    $scope.showAlert = function (Msg) {

        var alertPopup = $ionicPopup.alert(Msg);

    };


  }

})();

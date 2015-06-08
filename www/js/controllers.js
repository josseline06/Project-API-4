(function(){

  'use strict';

  angular

  .module('controllers', [])

  .controller('DashCtrl', DashCtrl)

  .controller('ChatsCtrl', ChatsCtrl)

  .controller('ChatDetailCtrl', ChatDetailCtrl)

  .controller('AccountCtrl', AccountCtrl)

  .controller('LoginCtrl', LoginCtrl)

  function DashCtrl ($scope){

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

  function LoginCtrl($scope, $http, $window, $location, $ionicPopup){
    $scope.user = {};

    $scope.login = function () {
      $http
        .post('http://localhost:8080/api/authenticate', $scope.user)

        .success(function (data, status, headers, config) {

          console.log(status);

          $window.sessionStorage.token = data.token;
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
        $location.path('signin/first  ');
    };
  }

})();

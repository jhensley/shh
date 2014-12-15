// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('shh', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
    var pageDir = './pages/';

    $stateProvider.state('home', {
      url: '/',
      templateUrl: pageDir + 'home.html',
      controller: 'HomeController'
    });

    $stateProvider.state('rules', {
      url: '/rules',
      templateUrl: pageDir + 'rules.html',
      controller: 'RulesController'
    });

    $stateProvider.state('gifts', {
      url: '/gifts',
      templateUrl: pageDir + 'gifts.html',
      controller: 'GiftsController'
    });

    $stateProvider.state('where', {
      url: '/where',
      templateUrl: pageDir + 'where.html',
      controller: 'WhereController'
    });

    $urlRouterProvider.otherwise("/");
})
.controller('HomeController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='home-bg';
  $rootScope.headerTitle = "Unlock-a-Gift";
  $rootScope.rightButtons = [{
    type: 'button-clear',
    content: 'Get Started',
    tap: function(e) {
      $location.path("/#/rules");
    }
  }];
}])
.controller('WhereController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='where-bg';
}])
.controller('RulesController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='rules-bg';
}])
.controller('GiftsController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='gifts-bg';
}])
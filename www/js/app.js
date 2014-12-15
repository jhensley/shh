// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('shh', ['ionic', 'ionic.contrib.ui.cards'])
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
      url: '/gifts/{id:[0-9]{1,4}}',
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
.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
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
.controller('GiftsController', ['$rootScope', '$scope', '$stateParams', function($rootScope, $scope, $stateParams) {
  $rootScope.bodyClass='gifts-bg';
  $scope.gift_number = $stateParams.id;
  if ($stateParams.id == 1) {
    $scope.gift = "a Johnny Mercer CD";
  }
}])
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', function($scope, $ionicSwipeCardDelegate) {
  var cardTypes = [{
    title: 'This statue stands in Ellis Square - one of twenty-two squares of his birthplace.',
    image: 'img/johnny-mercer-statue.jpg'
  }, {
    title: 'Johnny was one of the founding members of Capitol Records in 1942.',
    image: 'img/mercer-capitol.jpg'
  }, {
    title: 'The Mercer House built in 1860 still stands in his hometown, though he never lived there.',
    image: 'img/mercer-house.jpg'
  }, {
    title: 'Johhny and Ginger Mercer had a daugher ... named Mandy.',
    image: 'img/mandy-mercer.jpg'
  }];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard(index);
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function(index) {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
}])
.controller('CardCtrl', ['$scope', '$ionicSwipeCardDelegate', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
}]);
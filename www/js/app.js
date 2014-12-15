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

    $stateProvider.state('solve', {
      url: '/solve',
      templateUrl: pageDir + 'solve.html',
      controller: 'SolveController'
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
}])
.controller('WhereController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='where-bg';
}])
.controller('RulesController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='rules-bg';
}])
.controller('SolveController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='solve-bg';
}])
.controller('GiftsController', ['$rootScope', '$scope', '$stateParams', function($rootScope, $scope, $stateParams) {
  $rootScope.bodyClass='gifts-bg';
  $scope.giftNumber = $stateParams.id;
  if ($stateParams.id == 1) {
    $scope.gift = "a Johnny Mercer CD";
  }
  if ($stateParams.id == 2) {
    $scope.gift = "Forces of Nature";
  }
  if ($stateParams.id == 3) {
    $scope.gift = "Chickens?";
  }
  if ($stateParams.id == 4) {
    $scope.gift = "Midnight in the Garden of Good and Evil";
  }
  if($stateParams.id < 5) {
    $scope.nextGift = parseInt($stateParams.id)+1;
  }
}])
.controller('CardsCtrl', ['$scope', '$ionicSwipeCardDelegate', function($scope, $ionicSwipeCardDelegate) {
  var GiftOneCards = [{
    index: 0,
    title: 'This statue stands in Ellis Square - one of twenty-two squares of his birthplace.',
    image: 'img/johnny-mercer-statue.jpg'
  }, {
    index: 1,
    title: 'Johnny was one of the founding members of Capitol Records in 1942.',
    image: 'img/mercer-capitol.jpg'
  }, {
    index: 2,
    title: 'The Mercer House built in 1860 still stands in his hometown, though he never lived there.',
    image: 'img/mercer-house.jpg'
  }, {
    index: 3,
    title: 'Johhny and Ginger Mercer had a daughter ... named Mandy.',
    image: 'img/mandy-mercer.jpg'
  }];

  var GiftTwoCards = [{
    index: 0,
    title: 'Ben Affleck and Sandra Bullock star as Ben Holmes and Sarah in this romantic comedy.',
    image: 'img/bullock-affeck.jpg'
  }, {
    index: 1,
    title: "Bullock purchased this home after shooting the movie, loving the film's final setting.",
    image: 'img/bullock-home.jpg'
  }, {
    index: 2,
    title: 'On the trip, many setbacks prevent Ben and Sarah from getting to their destination.',
    image: 'img/thunderstorm.jpg'
  }, {
    index: 3,
    title: "The movie's tagline is: He went from the eye of the storm, into the arms of a hurricane.",
    image: 'img/hurricane.jpg'
  }];

  var GiftThreeCards = [{
    index: 0,
    title: 'There are more chickens in the world than any other species of bird.',
    image: 'img/rooster.jpg'
  }, {
    index: 1,
    title: 'The creator of these kitchen accessories has chickens at her home off the Georgia coast.',
    image: 'img/paula-deen.jpg'
  }, {
    index: 2,
    title: 'Chickens are able to remember over 100 individuals; they can also recognise humans.',
    image: 'img/smart-chicken.jpg'
  }, {
    index: 3,
    title: 'Chickens can’t taste sweetness in foods however they can detect salt, and most avoid it.',
    image: 'img/salt.jpg'
  }];

  var GiftFourCards = [{
    index: 0,
    title: 'Simply known as "The Book" in the location of this non-fiction tale.',
    image: 'img/johnny-mercer-statue.jpg'
  }, {
    index: 1,
    title: 'Once a drug store this cafe has become famous thanks to "The Book".',
    image: 'img/clarys.jpg'
  }, {
    index: 2,
    title: 'Test 2.',
    image: 'img/mercer-house.jpg'
  }, {
    index: 3,
    title: 'Test 3.',
    image: 'img/mandy-mercer.jpg'
  }];

  var GiftFiveCards = [{
    index: 0,
    title: 'Test 0.',
    image: 'img/johnny-mercer-statue.jpg'
  }, {
    index: 1,
    title: 'Test 1.',
    image: 'img/mercer-capitol.jpg'
  }, {
    index: 2,
    title: 'Test 2.',
    image: 'img/mercer-house.jpg'
  }, {
    index: 3,
    title: 'Test 3.',
    image: 'img/mandy-mercer.jpg'
  }];

  if($scope.giftNumber == 1) {
    cardTypes = GiftOneCards;
  }

  if($scope.giftNumber == 2) {
    cardTypes = GiftTwoCards;
  }

  if($scope.giftNumber == 3) {
    cardTypes = GiftThreeCards;
  }

  if($scope.giftNumber == 4) {
    cardTypes = GiftFourCards;
  }

  if($scope.giftNumber == 5) {
    cardTypes = GiftFiveCards;
  }

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard(index);
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function(index) {
    var cardIndex;
    if(index >= cardTypes.length - 1) {
      cardIndex = 0;
    } else {
      cardIndex = index + 1
    }
    var newCard = cardTypes[cardIndex];
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
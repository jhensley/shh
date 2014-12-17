// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var unlockTries = 0,
    hasSeenHintsCards;

angular.module('shh', ['ionic', 'ionic.contrib.ui.cards', 'ngAnimate', 'ipCookie'])
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

    $stateProvider.state('hints', {
      url: '/hints',
      templateUrl: pageDir + 'gifts.html',
      controller: 'HintsController'
    });

    $stateProvider.state('solve', {
      url: '/solve',
      templateUrl: pageDir + 'solve.html',
      controller: 'SolveController'
    });

    $stateProvider.state('tabs', {
      url: "/reveal-tabs",
      abstract: true,
      templateUrl: pageDir + "reveal/tabs.html"
    }).state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: pageDir + "reveal/home.html",
          controller: 'RevealHomeController'
        }
      }
    }).state('tabs.where', {
      url: "/where",
      views: {
        'where-tab': {
          templateUrl: pageDir + "reveal/where.html",
          controller: 'RevealWhereController'
        }
      }
    }).state('tabs.when', {
      url: "/when",
      views: {
        'when-tab': {
          templateUrl: pageDir + "reveal/when.html",
          controller: 'RevealHomeController'
        }
      }
    }).state('tabs.details', {
      url: "/details",
      views: {
        'details-tab': {
          templateUrl: pageDir + "reveal/details.html",
          controller: 'RevealHomeController'
        }
      }
    });


    var restoredState = decodeURIComponent(getCookieValue('restorestate'));

    $urlRouterProvider.otherwise(restoredState);
})
.run(function($rootScope, ipCookie) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

    var restore = toState.name;

    if(toParams.id) {
      restore = restore + '/' + toParams.id;
    }

    ipCookie('restorestate',restore, { expires: 30 });

  });

  //let everthing know that we need to save state now.
  window.onbeforeunload = function(event) {
    $rootScope.$broadcast('savestate');
  };
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
.controller('RulesController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='rules-bg';
}])
.controller('RevealController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='reveal-bg';
}])
.controller('RevealHomeController', ['$rootScope', '$scope', function($rootScope, $scope) {
  $rootScope.bodyClass='reveal-bg';
}])
.controller('SolveController', ['$rootScope', '$scope', '$location', '$timeout', function($rootScope, $scope, $location, $timeout) {
  $rootScope.bodyClass='solve-bg';
    var answer = 'savannah',
        wrapper = document.getElementsByClassName("shakenbake"),
        hintsBtn = document.getElementsByClassName("hints-button"),
        secondHint = document.getElementsByClassName("second-hint"),
        thirdHint = document.getElementsByClassName("third-hint");

    $scope.animationComplete = false;
    $scope.submitted = false;
    $scope.submit = function() {
      var guess = $scope.text.toLowerCase();
      if(guess==answer) {
        $location.path( "/reveal-tabs/home" );
      } else {
        $scope.isWrongAnswer = true;
        angular.element(wrapper).addClass('shake');
        unlockTries++;
      }

      if(unlockTries >= 3 && !hasSeenHintsCards) {
        angular.element(hintsBtn).addClass('show');
      }

      if(unlockTries >= 6 && hasSeenHintsCards) {
        angular.element(secondHint).addClass('show');
      }

      if(unlockTries >= 9 && hasSeenHintsCards) {
        angular.element(thirdHint).addClass('show');
      }

      $timeout(function(){
        angular.element(wrapper).removeClass('shake');
      }, 500);
      $scope.text = '';
    };
}])
.controller('GiftsController', ['$rootScope', '$scope', '$stateParams', '$state', function($rootScope, $scope, $stateParams, $state) {
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
  if ($stateParams.id == 5) {
    $scope.gift = "a can of Honey Bee Salve";
  }
  if($stateParams.id < 5) {
    $scope.nextGift = parseInt($stateParams.id)+1;
  }
}])
.controller('HintsController', ['$rootScope', function($rootScope) {
  $rootScope.bodyClass='hints-bg';
  $rootScope.showHints = true;
  hasSeenHintsCards = true;
}])
.controller('CardsCtrl', ['$scope', '$rootScope', '$ionicSwipeCardDelegate', function($scope, $rootScope, $ionicSwipeCardDelegate) {
  var GiftOneCards = [{
    index: 0,
    title: 'This statue stands in <b>Ellis Square</b> - one of twenty-two squares of <b>his birthplace</b>.',
    image: 'img/johnny-mercer-statue.jpg'
  }, {
    index: 1,
    title: 'Johnny was one of the founding members of Capitol Records in 1942.',
    image: 'img/mercer-capitol.jpg'
  }, {
    index: 2,
    title: '<b>The Mercer House</b> built in 1860 still stands in <b>his hometown</b>, though he never lived there.',
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
    title: "Bullock purchased this home after shooting the movie, loving <b>the film's final setting</b>.",
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
    title: 'The creator of these kitchen accessories has chickens at her home <b>off the Georgia coast</b>.',
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
    title: '<b>Locally</b> known as "The Book" in <b>the setting of this non-fiction based tale</b>.',
    image: 'img/book.jpg'
  }, {
    index: 1,
    title: 'Once a drug store this cafe has become famous thanks to "The Book".',
    image: 'img/clarys.jpg'
  }, {
    index: 2,
    title: 'Hotel tax revenues rose about twenty-five percent in the two years following the book.',
    image: 'img/inn.jpg'
  }, {
    index: 3,
    title: "Like many other sites, <b>Bonaventure Cemetery</b> became famous after publication of the book.",
    image: 'img/cemetery.jpg'
  }];

  var GiftFiveCards = [{
    index: 0,
    title: 'Honey contains all necessities sustain life: enzymes, vitamins, minerals, and water.',
    image: 'img/honey.jpg'
  }, {
    index: 1,
    title: "You'll find several stores, including this brand's flagship store in <b>the company's namesake city</b>.",
    image: 'img/bee-store.jpg'
  }, {
    index: 2,
    title: 'A bee flies to 1,000 flowers to make a single spoonful of honey.',
    image: 'img/bee-flower.jpg'
  }, {
    index: 3,
    title: 'The <b>Savannah</b> Bee Company grew out of a passion for bees, honey and beekeeping.',
    image: 'img/honey-love.jpg'
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

  if($rootScope.showHints) {
    cardTypes = [
      {
        index: 0,
        title: 'CD: This statue stands in <b>Ellis Square</b> - one of twenty-two squares of <b>his birthplace</b>.',
        image: 'img/johnny-mercer-statue.jpg'
      },
      {
        index: 1,
        title: 'CD: <b>The Mercer House</b> built in 1860 still stands in <b>his hometown</b>, though he never lived there.',
        image: 'img/mercer-house.jpg'
      },
      {
        index: 2,
        title: "Movie: Bullock purchased this home after shooting the movie, loving <b>the film's final setting</b>.",
        image: 'img/bullock-home.jpg'
      },
      {
        index: 3,
        title: 'Chickens: The creator of these kitchen accessories has chickens at her home <b>off the Georgia coast</b>.',
        image: 'img/paula-deen.jpg'
      },
      {
        index: 4,
        title: 'Book: <b>Locally</b> known as "The Book" in <b>the setting of this non-fiction based tale</b>.',
        image: 'img/book.jpg'
      },
      {
        index: 5,
        title: "Book: Like many other sites, <b>Bonaventure Cemetery</b> became famous after publication of the book.",
        image: 'img/cemetery.jpg'
      },
      {
        index: 6,
        title: "Salve: You'll find several stores, including this brand's flagship store in <b>the company's namesake city</b>.",
        image: 'img/bee-store.jpg'
      },
      {
        index: 7,
        title: 'Salve: The <b class="red">Savannah</b> Bee Company grew out of a passion for bees, honey and beekeeping.',
        image: 'img/honey-love.jpg'
      }
    ]
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
}])
.controller('RevealWhereController', function($scope, $ionicLoading, $compile) {
  function initialize() {
    var myLatlng = new google.maps.LatLng(32.06536, -81.095202);

    var mapOptions = {
      center: myLatlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div>Savannah, GA!</div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    infowindow.open(map,marker);


    $scope.map = map;
  }
  initialize();

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

});
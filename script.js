var pokemon = angular.module('pokemon', ['ui.bootstrap', 'ngRoute']);

pokemon.config(function($routeProvider){
  $routeProvider.
  when('/details/:id', {
    templateUrl: 'details.html',
    controller: 'DetailsController'
  });
});


pokemon.controller('PokeController', function($scope, $http) {
  
  $scope.summaryFirstLetter = "";

   $scope.filtered = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 5
  ,$scope.maxSize = 5;
  
  $scope.makePokemon = function() {
    $scope.pokemon = [];
    
    $http.get("https://pokeapi.co/api/v2/pokemon")
    .then(function(response) {

      abece = 'abcdefghijklmnopqrstuvwxyz';
      map1 = {};

      $scope.pokemon = response.data.results;

      for (char of abece) {

        var countfiltered = $scope.pokemon.filter(function(element){
          return element.name.substring(0,1) == char;
        }).length

        map1[char] = countfiltered;
      }

      $scope.summaryFirstLetter = map1;

      $scope.numPages = function () {
        return Math.ceil($scope.pokemon.length / $scope.numPerPage);
      };
      
      $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;
        
        $scope.filtered = $scope.pokemon.slice(begin, end);
      });
      
    });

  };
  $scope.makePokemon(); 
  

});

pokemon.controller("DetailsController",function($scope, $routeParams, $http){
  

  $http.get("https://pokeapi.co/api/v2/pokemon/" + $routeParams.id)
    .then(function(response) {
      $scope.detailsObj = response.data;

    });


});
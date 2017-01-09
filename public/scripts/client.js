console.log('JS here');

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl : 'views/routes/home.html',
      controller: 'homeController'
    })
    .when('/add', {
      templateUrl : 'views/routes/add.html',
      controller: 'addController'
    })
    .when('/pets', {
      templateUrl : 'views/routes/pets.html',
      controller: 'petsController'
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);

myApp.controller( 'homeController', [ '$scope', '$http', function( $scope, $http ){
  console.log('NG home');

}]);// end homeController

myApp.controller( 'addController', [ '$scope', '$http', function( $scope, $http ){
  console.log('NG add');

  $scope.addPet = function(){
    console.log('in addPet');

    $http({
      method: 'POST',
      url: '/petInventory',
      data: {
        name: $scope.nameIn,
        animal: $scope.animalIn,
        age: $scope.ageIn,
        imageUrl: $scope.imgUrlIn
      }
    }).then( function( response ){
      console.log('after da post: ', response);
    });// end http
    $scope.nameIn = '';
    $scope.animalIn = '';
    $scope.ageIn = '';
    $scope.imgUrlIn = '';
  }// end postPet()

}]);// end addController

myApp.controller( 'petsController', [ '$scope', '$http', function( $scope, $http ){
  console.log('NG pets');

  $scope.getAllPets = function(){
    console.log('in getAllPets');

    $http({
      method: 'GET',
      url: '/petInventory'
    }).then( function( response ){
      console.log('response: ', response);
      $scope.allPets = response.data;
    });// end http
  }// end getAllPets()

  $scope.deletePet = function(id){
    console.log('in deletePet, with index: ', id);

    $http({
      method: 'DELETE',
      url: '/petInventory/'+id
    }).then( function( response ){
      console.log('deleted, server says: ', response);
      $scope.getAllPets();
    });// end http
  }; // end deletePet

  $scope.getAllPets();
}]);// end petsController

console.log('JS here');

var myApp = angular.module( 'myApp', [] );

myApp.controller( 'appController', [ '$scope', '$http', function( $scope, $http ){
  console.log('NG here');

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
      $scope.getAllPets();
    });// end http
    $scope.nameIn = '';
    $scope.animalIn = '';
    $scope.agaIn = '';
    $scope.imgUrlIn = '';
  }// end postPet()

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

}]);// end appController

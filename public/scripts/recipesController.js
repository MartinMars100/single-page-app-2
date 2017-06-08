(function() {
  'use strict';
angular.module('app')

.controller('RecipesController', function($scope, dataService, $location, $window) {
  
  //Get All Recipes
  dataService.getAllRecipes(function(response){
    $scope.recipes = response.data;
  });
  
  //Get All Categories
  dataService.getCategories(function(response){
    $scope.categories = response.data;
  });
  
  //Get All Recipes in a Specified Category
  $scope.getRecipesForCategory = function(category) {
         if (category === "All Categories" || category === null) {
            dataService.getAllRecipes(function(response) {
              $scope.recipes = response.data;
            });
         } else {
            dataService.getRecipesForCategory(category, function(response) {
               $scope.recipes = response.data;
            });
         }
      };
  
  $scope.newRecipePath = function() {
    $location.path('/add');
  };
  
  
  $scope.editRecipe = function(recipeId) {
    $location.path('/edit/' + recipeId);
  };
  
  $scope.deleteRecipe = function(recipeId, $index) {
    var confirmDelete = confirm("Is it ok to delete this recipe?");
    if (confirmDelete) {
      dataService.deleteRecipe(recipeId, function(response) {
      $scope.recipes.splice($index, 1);
      });
    }
  };
  
});

})();  


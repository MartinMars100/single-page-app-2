(function() {
  'use strict';
angular.module('app')

.controller('RecipeDetailController', function($scope, dataService, $location, $window) {
  
        if ($location.path() === '/add') {
           $scope.mode = 'add';
           $scope.recipe = { ingredients: [], steps: [] };
        } else {
           $scope.mode = 'edit';
           var recipeId = $location.path().split('/').slice(-1)[0];
           dataService.getRecipe(recipeId, function(response) {
              $scope.recipe = response.data;
           });
        }

        dataService.getCategories(function (response) {
            $scope.categories = response.data;
        });

        dataService.getFoodItems(function (response) {
            $scope.foodItems = response.data;
        });

        $scope.saveRecipe = function() {
          $scope.errors = [];
          if ($scope.mode === 'add') {
            $scope.newRecipe();
          } else {
            $scope.updateRecipe();
          }
        };
        
        $scope.newRecipe = function() {
         dataService.newRecipe($scope.recipe,
            function(response) {
               $scope.showAllRecipes();
            },
            function(response) {
               $scope.collectErrors(response);
            }
         );
        };
        
        $scope.showAllRecipes = function() {
         $location.path('/');
        };
      
        $scope.updateRecipe = function() {
          dataService.updateRecipe($scope.recipe, 
            function(response) {     //Successful Response Function
                $scope.showAllRecipes();
            },
            function(response) {     //Error Response Function
              if (response.status !== 200) {
                var errorMsg = 
                $scope.error = "There was a problem updating this recipe.";
              }
           });
        };
        
        $scope.addIngredient = function() {
         $scope.recipe.ingredients.push({
           foodItem: "",
           condition: "",
           amount: ""
         });
        };
        
        $scope.deleteIngredient = function($index) {
         $scope.recipe.ingredients.splice($index, 1);
        };
        
        $scope.deleteStep = function($index) {
         $scope.recipe.steps.splice($index, 1);
        };

        $scope.addStep = function() {
         console.log('log addStep rec-det-cntrl'); 
         $scope.recipe.steps.push({ description: "" });
        }
});

})();  


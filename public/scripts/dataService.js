(function() {
  'use strict';
angular.module('app')
  .service('dataService', function($http) {
    
    //Get All Recipes 
    this.getAllRecipes = function(callback){
      $http.get('/api/recipes')
      .then(callback);
    };
  
    //Get One Recipe
    this.getRecipe = function(id, callback) {
      $http.get('/api/recipes/' + id)   
      .then(callback);  
    };
    
    //Get All Categories
    this.getCategories = function(callback){
      $http.get('/api/categories')
      .then(callback);
    };
    
    //Get Food Items 
    this.getFoodItems = function(callback) {
      $http.get('/api/fooditems')
      .then(callback);
    };
    
    //Get All Recipes For a Specified Category
   
    this.getRecipesForCategory = function (category, callback) {
      $http.get('/api/recipes?category=' + category.name)
      .then(callback);
    };

    // New Recipe 
    this.newRecipe = function(recipe, successCallback, errorCallback) {
      $http.post('/api/recipes', recipe)
      .then(successCallback, errorCallback);
    };

    // Update Recipe
    this.updateRecipe = function(recipe, successCallback, errorCallback) {
      $http.put('/api/recipes/' + recipe._id, recipe)
      .then(successCallback, errorCallback);
      };
    
    this.deleteRecipe = function(recipeId, callback) {
         $http.delete('/api/recipes/' + recipeId)
         .then(callback);
      };
  });    
})();
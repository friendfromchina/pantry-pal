import { Injectable } from '@angular/core';
import { mashapeKey } from './api';
import { Recipe } from './data/recipes';
import { RECIPES } from './data/recipes';
import { INGREDIENTS } from './data/ingredients';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'X-Mashape-Key': mashapeKey
     })
};

@Injectable()
export class RecipeService {

  constructor(
    private http: HttpClient
  ) { }

  // getRecipes(): Observable<Recipes[]> {
  //   return of(RECIPES);
  // }
  //
  // getRecipe(id: number): Observable<Recipe> {
  //   return of(RECIPES.find(recipe => recipe.id === id));
  // }

  getRecipes(): Observable<Recipes[]> {
    let ingredients = [];
    for (let i = 0; i < INGREDIENTS.length; i++) {
      ingredients.push(INGREDIENTS[i].name)
    }
    ingredients = ingredients.join(',');
    ingredients = encodeURIComponent(ingredients);
    return this.http.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${ingredients}&limitLicense=false&number=20&ranking=2`, httpOptions)
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information?includeNutrition=false`, httpOptions);
  }

}

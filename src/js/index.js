// https://www.food2fork.com/api/search
// 002f709ab8051692b265aadd1402cb51

// import str from './models/Search';
// // import { add as a, multiply as m, ID } from './views/searchView';
// import * as searchView from './views/searchView';

// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}, ${str}`);

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global state of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

 const state = {};
/**
 * SEARCH CONTROLLER
 */
 const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();
    console.log(query); 

    if(query) {
        // 2) New search object and add to the state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            //console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch(error) {
            alert('Something went wrong with the search...');
            clearLoader();
        }
    }
 }

 elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
 });

elements.searchResPages.addEventListener('click', e => {
    // console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        // console.log(goToPage);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

// const search = new Search('pizza');
// console.log(search);
// search.getResults();

/**
 * SEARCH CONTROLLER
 */

 const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        
        // Highlight selected recipe
        if(state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);
        
        try {
             // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            // console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch(error) {
            alert('Error processing recipe!');
        }
    }
 } 
//  window.addEventListener('hashchange', controlRecipe);
//  window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease bttn is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase btn is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }

    console.log(state.recipe);
})
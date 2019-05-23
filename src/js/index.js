// https://www.food2fork.com/api/search
// 002f709ab8051692b265aadd1402cb51

// import str from './models/Search';
// // import { add as a, multiply as m, ID } from './views/searchView';
// import * as searchView from './views/searchView';

// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}, ${str}`);

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global state of the app
 * - Search Object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

 const state = {};

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

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        //console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result);
    }
 }

 elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
 });


// const search = new Search('pizza');
// console.log(search);
// search.getResults();
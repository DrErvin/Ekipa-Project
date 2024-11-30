import { RES_PER_PAGE } from './config.js';
import * as model from './model.js';
import SearchView from './views/SearchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

console.log(RES_PER_PAGE);

const controlOpportunities = async function () {
  try {
    // const id = window.location.hash.slice(1);

    // if (!id) return;
    // recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    // bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    // await model.loadRecipe(id);
    await model.loadOpportunity();

    // 3) Rendering recipe
    // recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    // recipeView.renderError();
  }
};

// A handler function to process the search query
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = SearchView.getQuery();

    // Guard clause: Do nothing if all query fields are empty
    // const isEmpty = Object.values(query).every((value) => value === '');
    // if (isEmpty || !query) return;
    if (!query) return;
    console.log(query);

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  controlOpportunities();
};
init();

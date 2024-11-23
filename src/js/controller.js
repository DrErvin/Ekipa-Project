import { RES_PER_PAGE } from './config.js';
import * as model from './model.js';
import SearchView from './views/SearchView.js';

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
    // 1) Get search query
    const query = SearchView.getQuery();
    if (!query) return;
    console.log(query);

    // 2) Load search results
    await model.loadSearchResults(query);

    // Proceed to fetch and process results based on `query`
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
  controlOpportunities();
};
init();

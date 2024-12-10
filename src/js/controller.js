import { RES_PER_PAGE } from './config.js';
import * as model from './model.js';
import SearchView from './views/SearchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import IntroView from './views/IntroView.js';
import OpportunitiesView from './views/OpportunitiesView.js';

console.log(RES_PER_PAGE);

const controlOpportunities = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 0) Scroll the viewport to the top and
    //    start rendering the loading spinner
    OpportunitiesView.scrollUp();
    OpportunitiesView.renderSpinner();

    // 1) Toggle sections visibility
    OpportunitiesView.toggleInit();

    // 0) Update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    // bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    // await model.loadRecipe(id);
    await model.loadOpportunity(id);

    // 3) Rendering recipe
    OpportunitiesView.render(model.state.opportunity);
  } catch (err) {
    console.error(err);
    OpportunitiesView.renderError();
  }
};

// A handler function to process the search query
const controlSearchResults = async function () {
  try {
    // 0) Scroll the viewport to the top and
    //    start rendering the loading spinner
    resultsView.scrollUp();
    resultsView.renderSpinner();

    // 1) Get search query
    const query = SearchView.getQuery();

    // Guard clause: Do nothing if all query fields are empty
    // const isEmpty = Object.values(query).every((value) => value === '');
    // if (isEmpty || !query) return;
    if (!query) return;
    console.log(query);

    // 2) Render intro-section with query data
    IntroView.render(query);

    // 3) Load search results
    await model.loadSearchResults(query);

    // 4) Render results
    resultsView.render(model.getSearchResultsPage());

    // 5) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.scrollUp();
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  OpportunitiesView.addHandlerRender(controlOpportunities);
  // controlOpportunities();
};
init();

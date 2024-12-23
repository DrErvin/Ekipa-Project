// filepath: /c:/Users/Jasir/Ekipaproject/Ekipa-Project/src/js/controller.js
import { RES_PER_PAGE } from './config.js';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import SearchView from './views/SearchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import IntroView from './views/IntroView.js';
import OpportunitiesView from './views/opportunitiesView.js';
import publishOpportunityView from './views/publishOpportunityView.js';
import featuredOpportunitiesView from './views/FeaturedOpportunitiesView.js';
import { fetchFeaturedOpportunities } from './model.js';

const controlFeaturedOpportunities = async function () {
  try {
    // Fetch data from the server
    const data = await fetchFeaturedOpportunities();
    console.log('Fetched Featured Opportunities:', data); // Debug log

    // Render the opportunities
    featuredOpportunitiesView.render(data);
  } catch (err) {
    featuredOpportunitiesView.renderError();
    console.error(err);
  }
};

// Initialize the rendering process
const initFeaturedOpportunities = function () {
  window.addEventListener('load', controlFeaturedOpportunities);
};

initFeaturedOpportunities();
console.log(RES_PER_PAGE);

const controlOpportunities = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 0) Scroll the viewport to the top and render the loading spinner
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

    // 3) Rendering opportunity
    OpportunitiesView.render(model.state.opportunity);
  } catch (err) {
    console.error(err);
    OpportunitiesView.renderError();
  }
};
// A handler function to process the search query
const controlSearchResults = async function () {
  try {
    // 0) Scroll the viewport to the top and render the loading spinner
    resultsView.scrollUp();
    resultsView.renderSpinner();

    // 1) Toggle sections visibility
    resultsView.toggleInit();

    // 2) Get search query
    const query = SearchView.getQuery();

    // Guard clause: Do nothing if all query fields are empty
    // const isEmpty = Object.values(query).every((value) => value === '');
    // if (isEmpty || !query) return;
    if (!query) return;
    console.log(query);

    // 3) Render intro-section with query data
    IntroView.render(query);

    // 4) Load search results
    await model.loadSearchResults(query);

    // 5) Render results
    resultsView.render(model.getSearchResultsPage());

    // 6) Render initial pagination buttons
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

const controlAddOpportunity = async function (newOpportunity) {
  try {
    // Show loading spinner
    publishOpportunityView.renderSpinner();

    // Upload the new opportunity data
    await model.uploadOpportunity(newOpportunity);
    console.log(model.state.opportunity);

    // Render opportunity
    OpportunitiesView.scrollUp();
    OpportunitiesView.toggleInit();
    OpportunitiesView.render(model.state.opportunity);

    // Success message
    publishOpportunityView.renderMessage();

    // Render bookmark view
    // bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.opportunity.id}`);
    // window.history.back() // Automatically goes back to last page

    // Close form window
    setTimeout(function () {
      publishOpportunityView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    publishOpportunityView.renderError(err.message);
  }
};

const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  OpportunitiesView.addHandlerRender(controlOpportunities);
  publishOpportunityView.addHandlerUpload(controlAddOpportunity);
  // controlOpportunities();
};
init();

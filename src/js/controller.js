import { RES_PER_PAGE } from './config.js';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import SearchView from './views/SearchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import IntroView from './views/IntroView.js';
import opportunitiesView from './views/opportunitiesView.js';
import publishView from './views/publishView.js';
import loginView from './views/loginView.js';

console.log(RES_PER_PAGE);

const controlOpportunities = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 0) Scroll the viewport to the top and render the loading spinner
    opportunitiesView.scrollUp();
    opportunitiesView.renderSpinner();

    // 1) Toggle sections visibility
    opportunitiesView.toggleInit();

    // 0) Update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    // bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    // await model.loadRecipe(id);
    await model.loadOpportunity(id);

    // 3) Rendering opportunity
    opportunitiesView.render(model.state.opportunity);
  } catch (err) {
    console.error(err);
    opportunitiesView.renderError();
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

const controlPublishOpportunity = async function (newOpportunity) {
  try {
    // Show loading spinner
    publishView.renderSpinner();

    // Upload the new opportunity data
    await model.uploadOpportunity(newOpportunity);
    console.log(model.state.opportunity);

    // Render opportunity
    opportunitiesView.scrollUp();
    opportunitiesView.toggleInit();
    opportunitiesView.render(model.state.opportunity);

    // Success message
    publishView.renderMessage();

    // Render bookmark view
    // bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.opportunity.id}`);
    // window.history.back() // Automatically goes back to last page

    // Close form window
    setTimeout(function () {
      publishView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    publishView.renderError(err.message);
  }
};

const controlLogIn = async function () {
  try {
    // Get login data from the login form
    const data = loginView.getLoginData();

    // Verify login credentials using the model
    const account = await model.verifyLogin(data);
    if (!account) {
      alert('Invalid email or password');
      return;
    }

    // Log success and user details
    console.log('Login successful:', model.state.user);

    // Update the login button text
    loginView.updateLoginButton();

    // Show success message
    loginView.renderMessage();

    // Close the login form
    // loginView.toggleWindow();
  } catch (err) {
    console.error('💥', err);
    loginView.renderError(err.message);
  }
};

const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  opportunitiesView.addHandlerRender(controlOpportunities);
  publishView.addHandlerUpload(controlPublishOpportunity);
  loginView.addHandlerLogin(controlLogIn);
  // controlOpportunities();
};
init();

// filepath: /c:/Users/Jasir/Ekipaproject/Ekipa-Project/src/js/controller.js
import { RES_PER_PAGE } from './config.js';
import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import featuredView from './views/featuredView.js';
import SearchView from './views/SearchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import introView from './views/introView.js';
import opportunitiesView from './views/opportunitiesView.js';
import publishView from './views/publishView.js';
import loginView from './views/loginView.js';
import logoutView from './views/logoutView.js';
import signupView from './views/signupView.js';
import applyView from './views/applyView.js';
import PDFView from './views/PDFView.js';
import adminView from './views/adminView.js';
import SmartSearchView from './views/SmartSearchView.js';
import smartResultsView from './views/smartResultsView.js';

const controlFeaturedOpportunities = async function () {
  try {
    featuredView.renderSpinner();

    // Fetch data from the server
    const data = await model.fetchFeatured();
    console.log('Fetched Featured Opportunities:', data); // Debug log

    // Render the opportunities
    featuredView.render(data);
  } catch (err) {
    featuredView.renderError();
    console.error(err);
  }
};

//console.log(RES_PER_PAGE);

const controlOpportunities = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Ignore scrolling sections
    if (id === 'featured-section' || id === 'newsletter-section') {
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // 0) Scroll the viewport to the top and render the loading spinner
    opportunitiesView.scrollUp();
    opportunitiesView.renderSpinner();

    // 1) Toggle sections visibility
    opportunitiesView.toggleSections();

    // 0) Update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    // bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadOpportunity(id);

    // 3) Attach isLoggedIn function to the markup method
    opportunitiesView.addHandlerPermission(model.isLoggedIn);

    // 4) Rendering opportunity
    opportunitiesView.render(model.state.opportunity);

    // 5) Attach event listeners for Apply Now buttons
    applyView.addHandlerShowWindow(model.isLoggedIn);

    opportunitiesView.addHandlerDownloadPDF(controlDownloadPDF);
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
    resultsView.toggleSections();

    // 2) Get search query
    const query = SearchView.getQuery();

    // Guard clause: Do nothing if all query fields are empty
    // const isEmpty = Object.values(query).every((value) => value === '');
    // if (isEmpty || !query) return;
    if (!query) return;
    console.log(query);

    // 3) Render intro-section with query data
    introView.render(query);

    // 4) Load search results
    await model.loadSearchResults(query);

    // 5) Render results
    resultsView.render(model.getSearchResultsPage());

    // 6) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError();
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
    opportunitiesView.toggleSections();
    opportunitiesView.render(model.state.opportunity);

    // Success message
    publishView.renderMessage();

    // Restore the original form HTML after renderMesssage clears it
    publishView.restoreOriginalHtml();

    // Render bookmark view
    // bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.opportunity.id}`);
    // window.history.back() // Automatically goes back to last page

    // Update the buttons in opportunitiesView after login
    opportunitiesView.updateButtons(model.isLoggedIn);

    opportunitiesView.addHandlerDownloadPDF(controlDownloadPDF);

    // Close form window
    setTimeout(function () {
      if (!publishView.isManuallyClosed()) publishView.toggleWindow();
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
    loginView.updateLoginButton(model.isLoggedIn());

    // Update log out form with user name and surname
    const userData = await model.getUserDetails();
    logoutView.updateUserNameSurname(userData);

    // Show success message
    loginView.renderMessage();

    // Restore the original form HTML after renderMesssage clears it
    loginView.restoreOriginalHtml();

    // Update the buttons in opportunitiesView after login
    opportunitiesView.updateButtons(model.isLoggedIn);

    // Close the login form
    setTimeout(function () {
      if (!loginView.isManuallyClosed()) loginView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    loginView.renderError(err.message);
  }
};

const controlLogInState = async function () {
  try {
    // Load user from local storage
    model.loadUserFromLocalStorage();

    // If user is logged in, update UI
    loginView.updateLoginButton(model.isLoggedIn());

    // Update log out form with user name and surname
    const userData = await model.getUserDetails();
    logoutView.updateUserNameSurname(userData);

    console.log('User restored from session:', model.state.user);
  } catch (err) {
    console.error('💥', err);
    logoutView.renderError(err.message);
    loginView.renderError(err.message);
  }
};

const controlLogOut = async function () {
  try {
    // Clear global state
    model.clearState();

    // Clear local storage
    model.clearLocalStorage();

    // Reset signup form validation state
    signupView.resetValidation();
    signupView.addHandlerValidation(controlValidateEmail);

    // Update the login/signup button text
    loginView.updateLoginButton();

    // Show success message
    logoutView.renderMessage();

    // Restore the original form HTML after renderMesssage clears it
    logoutView.restoreOriginalHtml();

    // Update the buttons in opportunitiesView after logout
    opportunitiesView.updateButtons(model.isLoggedIn);

    // Close the login form
    setTimeout(function () {
      if (!logoutView.isManuallyClosed()) logoutView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    logoutView.renderError(err.message);
  }
};

const controlSignup = async function (newAccount) {
  try {
    // Show loading spinner
    signupView.renderSpinner();

    // Upload the new opportunity data
    // await model.uploadOpportunity(newOpportunity);
    // console.log(model.state.opportunity);
    await model.uploadAccount(newAccount);
    // console.log(newAccount);

    // Update the login button text
    loginView.updateLoginButton(model.isLoggedIn());

    // Update log out form with user name and surname
    const userData = await model.getUserDetails();
    logoutView.updateUserNameSurname(userData);

    // Success message
    signupView.renderMessage();

    // Restore the original form HTML after renderMesssage clears it
    signupView.restoreOriginalHtml();

    setTimeout(function () {
      if (!signupView.isManuallyClosed()) signupView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    signupView.renderError(err.message);
  }
};

const controlSignupWindow = async function () {
  try {
    // Close the login form if it is open
    if (!loginView.isManuallyClosed()) loginView.toggleWindow();

    // Open the signup form
    signupView.toggleWindow();

    if (model.areUniversitiesCached()) return;

    // Preload university domains
    await model.preloadUniversityDomains();
  } catch (err) {
    console.error('💥', err);
    signupView.renderError(err.message);
  }
};

const controlValidateEmail = async function (email) {
  try {
    const isValid = await model.validateEmail(email);

    return isValid; // Return validation status to be used in the view
  } catch (err) {
    console.error('💥', err);
    signupView.renderError(err.message);
  }
};

const controlApplication = async function (formData) {
  try {
    // Show loading spinner
    applyView.renderSpinner();

    // Append userId and opportunityId from the global state
    formData.append('userId', model.state.user.id);
    formData.append('opportunityId', model.state.opportunity.id);

    // Prepare data for submission
    // const applicationData = { userId, opportunityId };

    // Submit data to the backend
    await model.submitApplication(formData);

    // Success message
    applyView.renderMessage();

    // Restore the original form HTML after renderMesssage clears it
    applyView.restoreOriginalHtml();

    setTimeout(function () {
      if (!applyView.isManuallyClosed()) applyView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    applyView.renderError(err.message);
  }
};

// const checkUserPermission = function (requiredType) {
//   const user = model.state.user;

//   // Check if user is logged in
//   if (!user.id) return false;

//   // Check if user is a student
//   return user.accountType === requiredType;
// };

const controlDownloadPDF = function () {
  const opportunity = model.state.opportunity;

  PDFView.generatePDF(opportunity);
};

const controlAdminDashboard = async function () {
  try {
    adminView.toggleSections();

    // Fetch all opportunities and applications
    const opportunities = await model.fetchAllOpportunities();
    const applications = await model.fetchAllApplications();
    const applicantsData = await model.fetchAllApplicantsData();

    adminView.renderStats(opportunities, applications);

    adminView.renderPieChart(applicantsData);
  } catch (err) {
    console.error('💥', err);
    adminView.renderError(err.message);
  }
};

const controlSmartSearch = async function () {
  try {
    smartResultsView.renderSpinner();
    smartResultsView.toggleSections();

    // 1. Get the query from the SmartSearchView
    const query = SmartSearchView.getQuery();
    if (!query) return;
    console.log(query);

    // 2. Send the query to the backend or API for processing (placeholder logic)
    const results = await model.performSmartSearch(query);
    console.log('Smart Search Results:', results);

    // 3. Render the results
    smartResultsView.render(results);
  } catch (err) {
    console.error('💥', err);
    smartResultsView.renderError(err.message);
  }
};

const init = function () {
  featuredView.addHandlerFeatured(controlFeaturedOpportunities);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  opportunitiesView.addHandlerRender(controlOpportunities);
  publishView.addHandlerUpload(controlPublishOpportunity);
  publishView.addHandlerShowWindow(model.isLoggedIn);
  controlLogInState();
  loginView.addHandlerLogin(controlLogIn);
  logoutView.addHandlerLogout(controlLogOut);
  signupView.addHandlerShowWindow(controlSignupWindow);
  signupView.addHandlerUpload(controlSignup);
  signupView.addHandlerValidation(controlValidateEmail);
  applyView.addHandlerApply(controlApplication);
  adminView.addHandlerShowSection(controlAdminDashboard, model.isLoggedIn);
  SmartSearchView.addHandlerSearch(controlSmartSearch);
  // controlOpportunities();
};
init();

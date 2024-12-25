import { RES_PER_PAGE, API_URL, EMPLOYEE_INFO } from './config.js';
import { AJAX } from './helpers.js';
import { calculateRemainingDays } from './helpers.js';

export const state = {
  opportunity: {},
  search: {
    query: {},
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  user: {
    id: null,
    accountType: null, // 'student' or 'Telekom'
  },
};

const createOpportunityObject = function (data) {
  const opportunity = data[0];
  return {
    id: opportunity.id,
    type: opportunity.type || 'Unknown Type',
    fieldOfStudy: opportunity.fieldOfStudy || 'General',
    title: opportunity.title || 'Untitled Opportunity',
    company: opportunity.company || 'Deutsche Telekom', // Default value
    location: opportunity.location || 'Not specified',
    opportunityDescription:
      opportunity.description || 'Description not available',
    yourProfile: opportunity.qualificationsAndRequirements || [],
    tags: opportunity.tags || [],
    experience: opportunity.experienceRequired || [],
    engagementType: opportunity.engagementType || 'Unknown Engagement Type',
    workArrangement: opportunity.workArrangement || 'Unknown Work Arrangement',
    deadline:
      calculateRemainingDays(opportunity.endingDate) || 'No deadline provided',
    benefits: opportunity.benefits || [],
    employeeInfo: opportunity.employeeInfo || EMPLOYEE_INFO, // Default value
    contactPerson: opportunity.contactPerson || 'Not specified',
    contactPersonEmail: opportunity.contactPersonEmail || 'Not provided',
  };
};

export const loadOpportunity = async function (id) {
  try {
    // const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    const data = await AJAX(`${API_URL}/opportunities`);
    console.log(data);
    console.log(typeof id);

    // Find the opportunity with the specified ID
    const result = data.find((opportunity) => +opportunity.id === +id);
    console.log(result);
    if (!result) throw new Error(`Opportunity with ID ${id} not found`);

    state.opportunity = createOpportunityObject([result]);

    // Check if recipe that you click on has the same ID as the recipes
    // stored in the bookmark array in state
    // This way each recipe you open will always get a bookmakred
    // tag either true or false
    // if (state.bookmarks.some((bookmark) => bookmark.id === id))
    //   state.recipe.bookmarked = true;
    // else state.recipe.bookmarked = false;

    console.log(state.opportunity);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    // Save the query in the global state
    state.search.query = query;

    // Fetch the JSON data from the local file
    const data = await AJAX(`${API_URL}/opportunities`);
    // If was a real API, we would use something like this
    //  const data = await AJAX(`${API_URL}?${queryString}`);
    console.log('Check for data in loadSearchResults', data);

    // Filter the data based on the query parameters
    const { location, titleOrKeyword, fieldOfStudy, type } = query;
    const matchedResults = data.filter((opportunity) => {
      return (
        (!location ||
          opportunity.location
            .toLowerCase()
            .includes(location.toLowerCase())) &&
        (!titleOrKeyword ||
          opportunity.title
            .toLowerCase()
            .includes(titleOrKeyword.toLowerCase()) ||
          opportunity.tags.some((tag) =>
            tag.toLowerCase().includes(titleOrKeyword.toLowerCase())
          )) &&
        (!fieldOfStudy ||
          (opportunity.fieldOfStudy &&
            opportunity.fieldOfStudy
              .toLowerCase()
              .includes(fieldOfStudy.toLowerCase()))) &&
        (!type || opportunity.type.toLowerCase().includes(type.toLowerCase()))
      );
    });

    // Map the filtered results to include only the required fields
    state.search.results = matchedResults.map((opportunity) => ({
      id: opportunity.id,
      type: opportunity.type,
      location: opportunity.location,
      title: opportunity.title,
      experience: opportunity.experienceRequired,
      deadline: calculateRemainingDays(opportunity.endingDate),
    }));

    // Reset the current page to the first page
    state.search.page = 1;

    console.log(state.search.results); // Debug: Check processed search results
  } catch (err) {
    console.error(`${err} 💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const uploadOpportunity = async function (newOpportunity) {
  try {
    // Process tags field into an array
    const tags = newOpportunity.tags
      ? newOpportunity.tags.split(',').map((tag) => tag.trim())
      : [];

    // Process experienceRequired field into an array
    const experienceRequired = newOpportunity.experienceRequired
      ? newOpportunity.experienceRequired.split(',').map((exp) => exp.trim())
      : [];

    // Process qualificationsAndRequirements into an array
    const qualificationsAndRequirements =
      newOpportunity.qualificationsAndRequirements
        ? newOpportunity.qualificationsAndRequirements
            .split(';')
            .map((req) => req.trim())
        : [];

    // Process benefits into an array
    const benefits = newOpportunity.benefits
      ? newOpportunity.benefits.split(';').map((ben) => ben.trim())
      : [];

    // Create opportunity object
    const opportunity = {
      id: Date.now(), // Timestamp-based numeric ID
      type: newOpportunity.type,
      fieldOfStudy: newOpportunity.fieldOfStudy,
      title: newOpportunity.title,
      location: newOpportunity.location,
      description: newOpportunity.description,
      qualificationsAndRequirements, // Processed field
      benefits, // Processed field
      tags,
      engagementType: newOpportunity.engagementType,
      workArrangement: newOpportunity.workArrangement,
      contactPerson: newOpportunity.contactPerson,
      contactPersonEmail: newOpportunity.contactPersonEmail,
      experienceRequired, // Processed field
      endingDate: newOpportunity.endingDate,
    };

    // If real API was used we could now upload and get a response
    // const data = await AJAX(`${API_URL}?key=${KEY}`, opportunity);
    // state.opportunity = createOpportunityObject(data);

    // Send data to server
    const response = await AJAX(`${API_URL}/opportunities`, opportunity);
    console.log('Server Response:', response);

    // Add to existing data
    state.opportunity = createOpportunityObject([response.data]);
    // state.opportunity = createOpportunityObject(data);

    // Simulate saving to data.json (adjust for real server if necessary)
    console.log('Opportunity Uploaded:', state.opportunity);
  } catch (err) {
    throw err;
  }
};

export const verifyLogin = async function (data) {
  try {
    // Fetch all accounts from the API
    const accounts = await AJAX(`${API_URL}/accounts`);

    // Find the account with matching email and password
    const account = accounts.find(
      (acc) => acc.email === data.email && acc.password === data.password
    );

    // Update the state if the account is valid
    if (account) {
      state.user.id = account.id;
      state.user.accountType = account.id.startsWith('s-')
        ? 'student'
        : 'Telekom';

      saveUserToLocalStorage();
    }

    // Return the account if found, otherwise return null
    return account || null;
  } catch (err) {
    throw err;
  }
};

const saveUserToLocalStorage = function () {
  localStorage.setItem('loggedInUser', JSON.stringify(state.user));
};

export const loadUserFromLocalStorage = function () {
  const storedUser = localStorage.getItem('loggedInUser');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    state.user.id = parsedUser.id;
    state.user.accountType = parsedUser.accountType;
  }
};

export const isLoggedIn = function () {
  return state.user.id;
};

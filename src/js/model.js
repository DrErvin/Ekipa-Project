import { RES_PER_PAGE, API_URL } from './config.js';
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
};

const createOpportunityObject = function (data) {
  const opportunity = data[0];
  return {
    id: opportunity.id,
    type: opportunity.type,
    fieldOfStudy: opportunity.fieldOfStudy,
    title: opportunity.title,
    company: opportunity.company,
    location: opportunity.location,
    opportunityDescription: opportunity.description,
    yourProfile: opportunity.qualificationsAndRequirements,
    tags: opportunity.tags,
    experience: opportunity.experienceRequired,
    engagementType: opportunity.engagementType,
    workArrangement: opportunity.workArrangement,
    deadline: calculateRemainingDays(opportunity.endingDate),
    benefits: opportunity.benefits,
    employeeInfo: opportunity.employeeInfo,
    contactPerson: opportunity.contactPerson,
    contactPersonEmail: opportunity.contactPersonEmail,
  };
};

export const loadOpportunity = async function (id) {
  try {
    // const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    const data = await AJAX(`${API_URL}`);
    console.log(data);
    console.log(typeof id);

    // Find the opportunity with the specified ID
    const result = data.find((opportunity) => opportunity.id === +id);
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
    const data = await AJAX(`${API_URL}`);
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

import { RES_PER_PAGE, API_URL } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  opportunity: {},
  search: {
    query: '',
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
    title: opportunity.title,
    company: opportunity.company,
    location: opportunity.location,
    opportunityDescription: opportunity.description,
    yourProfile: opportunity.qualificationReq,
    tags: opportunity.tags,
    positionExp: opportunity.positionExp,
    engagementType: opportunity.engagementJobType,
    postingDate: opportunity.postingDate,
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
    state.opportunity = createOpportunityObject(data);

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
    const { location, fieldOfStudy, title, keyword } = query;
    state.search.results = data.filter((opportunity) => {
      return (
        (!location ||
          opportunity.location
            .toLowerCase()
            .includes(location.toLowerCase())) &&
        (!fieldOfStudy ||
          opportunity.tags.some((tag) =>
            tag.toLowerCase().includes(fieldOfStudy.toLowerCase())
          )) &&
        (!title ||
          opportunity.title.toLowerCase().includes(title.toLowerCase())) &&
        (!keyword ||
          opportunity.description.toLowerCase().includes(keyword.toLowerCase()))
      );
    });

    // Reset the current page to the first page
    state.search.page = 1;

    console.log(state.search.results); // Debug: Check processed search results
  } catch (err) {
    console.error(`${err} 💥`);
    throw err;
  }
};

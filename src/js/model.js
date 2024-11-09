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
  const opportunity = data.data[0];
  return {
    slug: opportunity.slug,
    companyName: opportunity.company_name,
    title: opportunity.title,
    description: opportunity.description,
    remote: opportunity.remote,
    sourceUrl: opportunity.url,
    tags: opportunity.tags,
    jobTypes: opportunity.job_types,
    location: opportunity.location,
    createdAt: opportunity.created_at,
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

import { RES_PER_PAGE } from './config.js';
import * as model from './model.js';

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

controlOpportunities();

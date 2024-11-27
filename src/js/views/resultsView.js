import View from './View.js';
import previewView from './previewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.container-opp-list');
  _errorMessage = 'No opportunities found for your query! Please try again';
  _message = '';

  _generateMarkup() {
    return this._data
      .map((opportunity) => previewView.render(opportunity, false))
      .join('');
  }
}

export default new ResultView();

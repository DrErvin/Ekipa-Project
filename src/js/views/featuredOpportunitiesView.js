import View from './View.js';

class FeaturedOpportunitiesView extends View {
  _parentElement = document.querySelector('.opportunities-grid');
  _errorMessage = 'No featured opportunities found. Please try again later!';

  render(data) {
    this._data = data;
    console.log('Rendering Featured Opportunities:', this._data); // Debug log
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError() {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', `<p>${this._errorMessage}</p>`);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    return this._data
      .map(
        (opportunity) => `
        <div class="opportunity-item">
          <h3>${opportunity.title || 'Untitled Opportunity'}</h3>
          <p>${opportunity.company || 'Unknown Company'} - ${opportunity.location || 'Location not specified'}</p>
          <a href="#${opportunity.id}" class="view-opportunity-btn">
            View Opportunity
          </a>
        </div>
      `
      )
      .join('');
  }
}

export default new FeaturedOpportunitiesView();
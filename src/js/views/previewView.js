import View from './View.js';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    return `
        <div class="opportunity-card">
          <img src="src/img/logo2.jpg" alt="Telekom logo" class="card-logo" />
          <div class="card-info">
            <h3 class="card-type">${this._data.type || 'N/A'}</h3>
            <h2 class="card-title">${
              this._data.title || 'Untitled Opportunity'
            }</h2>
          </div>
          <div class="card-details">
            <div class="card-detail-item">
              <div class="card-detail-label">
                <svg class="card-icon">
                    <use href="src/img/icons.svg#icon-location-marker"></use>
                  </svg>
                <span>Location</span>
              </div>
              <p>${this._data.location || 'Not specified'}</p>
            </div>
            <div class="card-detail-item">
              <div class="card-detail-label">
                <svg class="card-icon">
                    <use href="src/img/icons.svg#icon-experience"></use>
                  </svg>
                <span>Experience</span>
              </div>
              <p>${
                Array.isArray(this._data.experience)
                  ? this._data.experience.join(', ')
                  : this._data.experience || 'N/A'
              }</p>
            </div>
            <div class="card-detail-item last-item">
              <div class="card-detail-label">
                 <svg class="card-icon">
                    <use href="src/img/icons.svg#icon-deadline"></use>
                  </svg>
                <span>Deadline</span>
              </div>
              <p>${this._data.deadline || 'No deadline'}</p>
            </div>
          </div>
          <button class="card-btn">View Opportunity</button>
        </div>
    `;
  }
}

export default new PreviewView();
import View from './View.js';

class opportunitiesView extends View {
  #mainContent = document.querySelector('#main-content');
  #detailsContent = document.querySelector('#opportunity-details-section');

  _parentElement = document.querySelector('.details-opportunity');
  _errorMessage = 'We could not find that Opportunity. Please try another one!';
  _message = '';

  #targetSection = document.querySelector('.details-opportunity');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  // #toggleSections() {
  //   if (!this.#mainContent.classList.contains('hidden')) {
  //     this.#mainContent.classList.add('hidden');
  //   }
  //   this.#detailsContent.classList.remove('hidden');
  // }

  toggleInit() {
    // this.#toggleSections();
    this.toggleSections([this.#targetSection]);
  }

  _generateMarkup() {
    return `
      <div class="container details-container">
        <div class="details-header">
          <img src="src/img/logo.jpg" alt="Company Logo" class="company-logo" />
          <h1 class="opportunity-title">${
            this._data.title || 'Untitled Opportunity'
          }</h1>
          <p class="opportunity-type">${this._data.type || 'N/A'}</p>
          <p class="opportunity-location">
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-location-marker"></use>
            </svg>
            ${this._data.location || 'Not specified'}
          </p>
          <p class="opportunity-tags">
            ${
              this._data.tags
                ?.map((tag) => `<span class="tag">${tag}</span>`)
                .join(' ') || 'No tags'
            }
          </p>
        </div>

        <div class="opportunity-info">
          <div class="opportunity-experience">
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-experience"></use>
            </svg>
            <p><strong>Experience:</strong> ${
              this._data.experience || 'N/A'
            }</p>
          </div>
          <div class="opportunity-engagement">
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-engagement"></use>
            </svg>
            <p><strong>Engagement:</strong> ${
              this._data.engagementType || 'N/A'
            }</p>
          </div>
          <div class="opportunity-deadline">
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-deadline"></use>
            </svg>
            <p><strong>Deadline:</strong> ${this._data.deadline || 'N/A'}</p>
          </div>
        </div>

        <!-- Apply Now Button -->
        <div class="apply-button">
          <a href="#" class="apply-now-btn">Apply Now</a>
        </div>

        <!-- Opportunity Description Section -->
        <div class="opportunity-section">
          <h2>Your Tasks (Job Description)</h2>
          <p>${
            this._data.opportunityDescription || 'Description not available.'
          }</p>
        </div>

        <!-- Qualifications & Requirements Section -->
        <div class="opportunity-section">
          <h2>Your Profile (Qualifications & Requirements)</h2>
          <ul>
            ${this._data.yourProfile.map((req) => `<li>${req}</li>`).join('')}
          </ul>
        </div>

        <!-- Benefits Section -->
        <div class="opportunity-section">
          <h2>What We Offer</h2>
          <ul>
            ${this._data.benefits
              .map((benefit) => `<li>${benefit}</li>`)
              .join('')}
          </ul>
        </div>

        <!-- Employee(Telekom DE) Info Section -->
        <div class="opportunity-section">
          <h2>About Telekom DE</h2>
          <p>
            ${this._data.employeeInfo}
          </p>
        </div>

        <!-- Contact Person Section -->
        <div class="contact-person-section">
          <h2>Contact Person</h2>
          <div class="contact-person-details">
            <img src="src/img/LoveMagenta.jpeg" alt="Contact Person" class="contact-person-image" />
            <div class="contact-person-info">
              <p><strong>Name:</strong> ${this._data.contactPerson || 'N/A'}</p>
              <p><strong>Email:</strong> 
                <a href="mailto:${this._data.contactPersonEmail || ''}">
                  ${this._data.contactPersonEmail || 'N/A'}
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Apply Now Button at the End -->
        <div class="apply-button">
          <a href="#" class="apply-now-btn">Apply Now</a>
        </div>
      </div>
    `;
  }
}

export default new opportunitiesView();

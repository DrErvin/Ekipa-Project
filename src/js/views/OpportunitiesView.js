import View from './View.js';

class opportunitiesView extends View {
  _parentElement = document.querySelector('.details-opportunity');
  _errorMessage = 'We could not find that Opportunity. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateMarkup() {
    return `
        <div class="container details-container">
        <div class="details-header">
          <img src="src/img/logo.jpg" alt="Company Logo" class="company-logo" />
          <!-- Add this line -->
          <h1 class="opportunity-title">Operations Manager</h1>
          <p class="opportunity-location">Adriatic Valley Digital Holding</p>
          <p class="opportunity-location-single">
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-location-marker"></use>
            </svg>
            Banja Luka
          </p>
          <p class="opportunity-tags"><a href="#">SCRUM</a> <a href="#">Sales</a></p>
        </div>

        <div class="opportunity-info">
          <div class="opportunity-type">
            <!-- <img src="src/img/marker.svg" alt="Marker Icon" class="icon-opport-header" /> -->
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-experience"></use>
            </svg>
            <p><strong>Experience:</strong> Senior</p>
          </div>
          <div class="opportunity-engagement">
            <!-- <img src="src/img/marker.svg" alt="Marker Icon" class="icon-opport-header" /> -->
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-engagement"></use>
            </svg>
            <p><strong>Engagement:</strong> Full-time</p>
          </div>
          <div class="opportunity-deadline">
            <!-- <img src="src/img/marker.svg" alt="Marker Icon" class="icon-opport-header" /> -->
            <svg class="icon-opport-header">
              <use href="src/img/icons.svg#icon-deadline"></use>
            </svg>
            <p><strong>Deadline:</strong> 15 days left</p>
          </div>
        </div>

        <!-- Apply Now Button -->
        <div class="apply-button">
          <a href="#" class="apply-now-btn">Apply Now</a>
        </div>

        <!-- Opportunity Description Section -->
        <div class="opportunity-section">
          <h2>Your Tasks (Job Description)</h2>
          <p>As an Operations Manager, you will oversee daily operations...</p>
        </div>

        <!-- Qualifications & Requirements Section -->
        <div class="opportunity-section">
          <h2>Your Profile (Qualifications & Requirements)</h2>
          <ul>
            <li>Minimum 5 years of experience in operations management</li>
            <li>Strong leadership and communication skills</li>
            <li>Proven experience with SCRUM and agile methodologies</li>
          </ul>
        </div>

        <!-- Benefits Section -->
        <div class="opportunity-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Competitive salary and performance bonuses</li>
            <li>Health and wellness benefits</li>
            <li>Opportunity for professional growth and development</li>
          </ul>
        </div>

        <!-- Employee(Telekom DE) Info Section -->
        <div class="opportunity-section">
          <h2>About the Company</h2>
          <p>
            Adriatic Valley Digital Holding is dedicated to fostering the
            development of the tech community in the Adriatic region, helping
            companies implement sustainable tech solutions...
          </p>
        </div>

        <!-- Contact Person Section -->
        <div class="contact-person-section">
          <h2>Contact Person</h2>
          <div class="contact-person-details">
            <img src="src/img/LoveMagenta.jpeg" alt="Contact Person" class="contact-person-image" />
            <div class="contact-person-info">
              <p><strong>Name:</strong> Jane Doe</p>
              <p><strong>Email:</strong> <a href="mailto:jane.doe@telekom.com">jane.doe@telekom.com</a></p>
            </div>
          </div>
        </div>

        <!-- Add a second Apply Now Button at the end of main content area -->
        <div class="apply-button">
          <a href="#" class="apply-now-btn">Apply Now</a>
        </div>
        `;
  }
}

export default new opportunitiesView();

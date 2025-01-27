import View from './View.js';

class adminView extends View {
  _parentElement = document.querySelector('#admin-content');
  _errorMessage =
    'We could not load the admin dashboard. Please try another time!';
  _message = '';

  _btnShow = document.querySelector('#admin-btn');
  #sectionsToShow = [
    document.querySelector('.smart-search'),
    document.querySelector('.admin-statistics'),

    document.querySelector('.admin-header'),
  ];

  constructor() {
    super();
    // this._addHandlerShowSection();
    // this._addHandlerHideWindow();
  }

  _showSection() {
    // this.#toggleSections();
    this.toggleSections(this.#sectionsToShow);
  }

  renderStats(opportunities, applications) {
    // Calculate active opportunities
    const activeOpportunities = opportunities.filter((opp) => {
      const currentDate = new Date();
      const endingDate = new Date(opp.endingDate);
      return endingDate >= currentDate;
    }).length;

    // Total applications count
    const totalApplications = applications.length;

    document.querySelector('#opportunities-count').textContent =
      activeOpportunities;
    document.querySelector('#applications-count').textContent =
      totalApplications;
  }

  addHandlerShowSection(handler, isLoggedIn) {
    this._btnShow.addEventListener('click', (e) => {
      e.preventDefault();

      if (!isLoggedIn('Telekom')) {
        alert(
          'You must be logged in as a Telekom user to access Admin Dashboard.'
        );
        return;
      }

      handler();
    });
  }
}
export default new adminView();

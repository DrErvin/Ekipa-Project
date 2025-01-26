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

  #showSection() {
    // this.#toggleSections();
    this.toggleSections(this.#sectionsToShow);
  }

  addHandlerShowSection(isLoggedIn) {
    this._btnShow.addEventListener('click', (e) => {
      e.preventDefault();

      if (!isLoggedIn('Telekom')) {
        alert(
          'You must be logged in as a Telekom user to access Admin Dashboard.'
        );
        return;
      }

      this.#showSection();
    });
  }
}
export default new adminView();

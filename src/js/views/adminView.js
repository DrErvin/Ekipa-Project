import View from './View.js';

class adminView extends View {
  _parentElement = document.querySelector('.admin-section');
  _errorMessage =
    'We could not load the admin dashboard. Please try another time!';
  _message = '';

  _btnShow = document.querySelector('#publishOpportunities');
  #sectionToShow = this._parentElement;
  #telekomPermission = null;

  constructor() {
    super();
    // this._addHandlerShowSection();
    // this._addHandlerHideWindow();
  }

  toggleInit() {
    // this.#toggleSections();
    this.toggleSections([this.#sectionToShow]);
  }

  addHandlerShowSection(isLoggedIn, handler) {
    this._btnShow.addEventListener('click', (e) => {
      e.preventDefault();

      if (!isLoggedIn('Telekom')) {
        alert('You must be logged in as a Telekom user to apply.');
        return;
      }

      if (this._btnShow.textContent.trim() === 'Admin Dashboard') {
        this.toggleInit();
        handler();
      }
    });
  }

  updateAdminButton() {
    this._btnShow.textContent = this._parentElement.classList.contains('hidden')
      ? 'Admin Dashboard'
      : 'Publish Opportunities';
  }
}
export default new adminView();

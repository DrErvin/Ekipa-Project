import View from './View.js';

class applyView extends View {
  _parentElement = document.querySelector('.apply-form');
  _message = 'You have successfully applied for this opportunity :)';

  _window = document.querySelector('.apply-form-window');
  _overlay = document.querySelector('.overlay--apply');

  _btnClose = document.querySelector('.apply-btn--close-modal');

  constructor() {
    super();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden-oppacity');
    this._window.classList.toggle('hidden-oppacity');
  }

  addHandlerShowWindow() {
    // Attach event listeners dynamically when opportunities are rendered
    const topBtn = document.querySelector('#apply-top-btn');
    const bottomBtn = document.querySelector('#apply-bottom-btn');

    if (topBtn) {
      topBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Top Apply Now Button Clicked');
        this.toggleWindow();
      });
    }

    if (bottomBtn) {
      bottomBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Bottom Apply Now Button Clicked');
        this.toggleWindow();
      });
    }
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));

    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        !this._overlay.classList.contains('hidden-oppacity') &&
        !this._window.classList.contains('hidden-oppacity')
      )
        this.toggleWindow();
    });
  }

  // getLoginData() {
  //   const email = this._parentElement.querySelector('#loginEmail').value;
  //   const password = this._parentElement.querySelector('#loginPassword').value;
  //   return { email, password };
  // }

  // updateLoginButton(isLoggedIn) {
  //   // const text = isLoggedIn ? 'Log Out' : 'Log In/Sign Up';
  //   this._btnsOpen.textContent = isLoggedIn ? 'Log Out' : 'Log In/Sign Up';
  // }

  isManuallyClosed() {
    return this._window.classList.contains('hidden-oppacity');
  }

  addHandlerApply(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  _generateMarkup() {}
}

export default new applyView();

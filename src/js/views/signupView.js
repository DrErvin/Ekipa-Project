import View from './View.js';

class signupView extends View {
  _parentElement = document.querySelector('.signup-form');
  _message = 'You have been successfully signed in!';

  _window = document.querySelector('.signup-form-window');
  _overlay = document.querySelector('.overlay--signup');
  _btnOpen = document.querySelector('#openSignUpForm');
  _btnClose = document.querySelector('.signup-btn--close-modal');

  constructor() {
    super();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden-oppacity');
    this._window.classList.toggle('hidden-oppacity');
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

  isManuallyClosed() {
    return this._window.classList.contains('hidden-oppacity');
  }

  addHandlerShowWindow(handler) {
    // this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._btnOpen.addEventListener('click', function () {
      handler(); // Call the handler provided by the controller
    });
  }

  _generateMarkup() {}
}

export default new signupView();

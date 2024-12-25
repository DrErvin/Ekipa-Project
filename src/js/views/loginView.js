import View from './View.js';

class loginView extends View {
  _parentElement = document.querySelector('.login-form');
  _message = 'You have been successfully logged in :)';

  _window = document.querySelector('.login-form-window');
  _overlay = document.querySelector('.overlay--login');
  _btnOpen = document.querySelector('#logInSignUp');
  _btnClose = document.querySelector('.login-btn--close-modal');
  _btnLogIn = document.querySelector('#logInSignUp');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden-oppacity');
    this._window.classList.toggle('hidden-oppacity');
    console.log('loginView toggle func was called');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
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

  getLoginData() {
    const email = this._parentElement.querySelector('#loginEmail').value;
    const password = this._parentElement.querySelector('#loginPassword').value;
    return { email, password };
  }

  updateLoginButton() {
    // const text = isLoggedIn ? 'Log Out' : 'Log In/Sign Up';
    this._btnLogIn.textContent = 'Log Out';
  }

  addHandlerLogin(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  // addHandlerUpload(handler) {
  //   this._parentElement.addEventListener('submit', function (e) {
  //     e.preventDefault();
  //     const dataArr = [...new FormData(this)];
  //     const data = Object.fromEntries(dataArr);
  //     console.log(data);
  //     handler(data);
  //   });
  // }

  _generateMarkup() {}
}

export default new loginView();
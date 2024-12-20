import View from './View.js';

class PublishOpportunityView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Opportunity was successfully uploaded :)';

  _window = document.querySelector('.publish-opportunity-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('#publishOpportunities');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hiddenOpp');
    this._window.classList.toggle('hiddenOpp');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.toggleWindow();
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new PublishOpportunityView();
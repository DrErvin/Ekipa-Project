export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. opportunity)
   * @param {boolean} [render = true] If false, create markup string insted of rendering to the DOM
   * @returns {undefined | string} A markup string is return if render=false
   * @this {Object} View instance
   * @author Ervin Dragovic
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clearHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    console.log(this._data);
    console.log('Ovo gore je this._data a ovo dole je samo argument data');
    console.log(data);
  }

  _clearHtml() {
    this._parentElement.innerHTML = '';
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <img src="src/img/marker.svg" alt="Marker Icon" class="icon-opport-header" />
            </div>
            <p>${message}</p>
        </div>
    `;
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

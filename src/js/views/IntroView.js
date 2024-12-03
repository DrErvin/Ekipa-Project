import View from './View.js';

class IntroView extends View {
  _parentElement = document.querySelector('.intro-section');

  /**
   * Generates markup for the intro section
   * @returns {string} The generated HTML markup
   */
  _generateMarkup() {
    const { location, fieldOfStudy, type, titleOrKeyword } = this._data;

    const title =
      location || fieldOfStudy || type
        ? `
        ${location ? `${location} Opportunities` : 'Opportunities'}
        ${fieldOfStudy ? `in ${fieldOfStudy}` : ''}
        ${type ? `of type ${type}` : ''}
      `.trim()
        : 'Opportunities of all types';

    const description = titleOrKeyword
      ? `With "${titleOrKeyword}"`
      : 'With all titles and keywords';

    return `
      <div class="container">
        <h1 class="intro-title">${title}</h1>
        <p class="intro-text">${description}</p>
      </div>
    `;
  }
}

export default new IntroView();
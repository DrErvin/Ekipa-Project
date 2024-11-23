class SearchView {
  #parentEl = document.querySelector('.search-form');

  /**
   * Get the user input from the form fields
   * @returns {Object} An object containing all input field values
   */

  getQuery() {
    const inputs = this.#parentEl.querySelectorAll('input[type="text"]');
    const query = {
      location: inputs[0].value.trim(),
      fieldOfStudy: inputs[1].value.trim(),
      title: inputs[2].value.trim(),
      keyword: inputs[3].value.trim(),
    };

    this.#clearInput();
    return query;
  }

  #clearInput() {
    const inputs = this.#parentEl.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => (input.value = ''));
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

class SearchView {
  #parentEl = document.querySelector('.search-form');

  /**
   * Get the user input from the form fields
   * @returns {Object} An object containing all input field values
   */

  getQuery() {
    const inputs = this.#parentEl.querySelectorAll('input[type="text"]');
    const dropdowns = this.#parentEl.querySelectorAll('select');

    const query = {
      location: inputs[0].value.trim(),
      titleOrKeyword: inputs[1].value.trim(),
      fieldOfStudy: dropdowns[0].value.trim(),
      type: dropdowns[1].value.trim(),
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

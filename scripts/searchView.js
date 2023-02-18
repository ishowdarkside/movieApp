class SearchView {
  #parentElement = document.querySelector(".section__catalog form");
  #contentElement = document.querySelector(".section__catalog__wrapper__grid");
  #sectionWrapper = document.querySelector(".section__catalog__wrapper ");

  delegateSearch(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const searchInput = e.target.firstElementChild;
      const searchData = searchInput.value;
      //Manipulate Search textholder
      document.querySelector(
        ".section__catalog__wrapper .heading-primary"
      ).textContent = `Search results for: ${searchData}`;
      handler(searchData);
      searchInput.value = "";
      searchInput.blur();
    });
  }

  renderSearch(movie) {
    this.#sectionWrapper.style.opacity = 1;
    if (!movie.Search) throw new Error("No Results Found");
    this._clear();

    const markup = movie.Search.map((el) => {
      if (el.Poster !== "N/A")
        return `
      <div class="section__catalog__grid__item" data-id="${el.imdbID}">
      <div class="overlay">
        <div class="abs">
          <div class="section__catalog__grid__item__movie-info">
            <h3 class="section__catalog__grid__item__title">
              ${el.Title}
            </h3>
            <p class="section__catalog__grid__item__year">${el.Year}</p>
          </div>
          <button id="viewMovie">View More</button>
        </div>
      </div>
      <img src="${el.Poster}" />
    </div>
      `;
    }).join("");

    this.#contentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this.#contentElement.innerHTML = "";
  }

  handleError() {
    this._clear();
    this.#contentElement.innerHTML = `<p class="error">No Results Found!</p>`;
  }
}

export default new SearchView();
export const inheritMe = new SearchView();

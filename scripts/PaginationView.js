class PaginationView {
  #btnLeft = document.querySelector("#previousPage");
  #btnRight = document.querySelector("#nextPage");
  #curPage = 1;
  #contentElement = document.querySelector(".section__catalog__wrapper__grid");
  #sectionWrapper = document.querySelector(".section__catalog__wrapper ");

  handleEvent(curState, handler) {
    this.#btnLeft.addEventListener(
      "click",
      function (e) {
        this.#curPage--;
        if (this.#curPage < 1) this.#curPage = 1;

        this.handlePagination(curState, handler, this.#curPage);
      }.bind(this)
    );

    this.#btnRight.addEventListener(
      "click",
      function (e) {
        this.#curPage++;
        if (this.#curPage > Math.ceil(curState.totalResults / 10)) {
          this.#curPage = Math.ceil(curState.totalResults / 10);
        }

        this.handlePagination(curState, handler, this.#curPage);
      }.bind(this)
    );
  }

  async handlePagination(arg, handler, page) {
    const data = await handler(arg.searchResult, page);
    if (data.Error) return;
    this.renderSearch(data);
  }
  ///"INHERITED"  METHODS

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

  resetCounter() {
    this.#curPage = 1;
  }
}

export default new PaginationView();

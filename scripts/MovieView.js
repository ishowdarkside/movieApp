class MovieView {
  #container = document.querySelector(".section__catalog__wrapper__grid");
  #movieOverlay = document.querySelector(".movie__overlay");
  #placeholderInfo = document.querySelector(".movie__wrap");

  handleView(handler) {
    this.#container.addEventListener(
      "click",
      async function (e) {
        if (e.target.getAttribute("id") === "viewMovie") {
          const selectedMovie = e.target.closest(
            ".section__catalog__grid__item"
          );
          const movieId = selectedMovie.dataset.id;
          const data = await handler(movieId);
          this.#movieOverlay.style.display = "block";
          this._renderPopUp(data);
      
        }
      }.bind(this)
    );
  }

  async _renderPopUp(movieData) {
    const projectData = await movieData;
    const markup = `
   
      <button id="closeOverlay">X</button>
      <img src="${projectData.Poster}" alt="" id="moviePoster" />
      <h2 class="heading-primary">${projectData.Title}</h2>
      <div class="movie__rating__wrap">
        <div class="movie__rating">
          <img src="/SVG/star-svgrepo-com.svg" alt="rating star" id="svg" />
          <span>${projectData.imdbRating}</span>
        </div>
        <span class="movie__duration">${projectData.Runtime}</span>
        <span class="movie__genres">${projectData.Genre}</span>
        <span class="movie__date">${projectData.Year}</span>
      </div>
      <span class="movie__desc"
        >${projectData.Plot}
      </span>
      <span class="movie__writer"
        ><img src="SVG/pen-svgrepo-com.svg" id="svg" />Writers:${projectData.Writer}</span
      >
      <span class="movie__cast">
        <img src="/SVG/person-svgrepo-com.svg" alt="" id="svg" />Cast:${projectData.Actors}
      </span>

     

    `;

    this.#placeholderInfo.innerHTML = markup;
    this._hideOverlay();
  }

  _hideOverlay() {
    this.#placeholderInfo.addEventListener(
      "click",
      function (e) {
        if (e.target.getAttribute("id")) {
          this.#movieOverlay.style.display = "none";
        }
      }.bind(this)
    );
  }
}

export default new MovieView();

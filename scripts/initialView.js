class initialView {
  #exploreBtn = document.querySelector("#search");
  #searchSection = document.querySelector(".section__catalog");

  handleListener() {
    this.#exploreBtn.addEventListener(
      "click",
      function (e) {
        this.#searchSection.scrollIntoView();
      }.bind(this)
    );
  }
}

export default new initialView();

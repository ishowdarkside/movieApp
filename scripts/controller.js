import { searchData } from "./module.js";
import searchView from "./searchView.js";
import { currentState } from "./module.js";
import PaginationView from "./PaginationView.js";
import { fetchData } from "./module.js";
import { fetchMovieID } from "./module.js";
import MovieView from "./MovieView.js";
import initialView from "./initialView.js";
const controlSearch = async function (arg) {
  try {
    //Fetching data from server
    const data = await searchData(arg);
    //Manipulating current Data

    currentState.list = data.Search;
    currentState.totalResults = data.totalResults;
    currentState.searchResult = arg;
    PaginationView.resetCounter();

    //Rednering Data based on search input
    searchView.renderSearch(data);

    //Pagination fucionality (getting desired page)
  } catch (err) {
    searchView.handleError();
  }
};

searchView.delegateSearch(controlSearch);
PaginationView.handleEvent(currentState, fetchData);
MovieView.handleView(fetchMovieID);
initialView.handleListener();

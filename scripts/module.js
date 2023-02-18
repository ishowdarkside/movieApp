export let currentState = {
  list: [],
  totalResults: 0,
};
export const searchData = async function (searchInput) {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=9bc30179&s=${searchInput}`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchData = async function (searchInput, p) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=9bc30179&s=${searchInput}&page=${p}`
  );

  const data = await res.json();

  return data;
};

export const fetchMovieID = async function (i) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=9bc30179&i=${i}`);
  const data = await res.json();

  return data;
};

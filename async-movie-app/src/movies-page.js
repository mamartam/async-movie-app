import "./scss/main.scss";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
import { createMovieBox } from "./functions.js";
const mainMoviesContainer = document.querySelector(".main__movies");
const currentPage = document.querySelector(".current-page");
const allPagesAmount = document.querySelector(".all-pages");
let page = 1;
currentPage.textContent = page;
let maxPages = 0;

async function getList(type, page) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log(data);

    maxPages = data.total_pages;
    allPagesAmount.textContent = data.total_pages;

    createMovieBox(data.results, mainMoviesContainer);
  } catch (error) {
    console.error(error);
    return null;
  }
}

getList("movie", 1);

const nextPageBtn = document.querySelector(".next-page-btn");
const previuosPageBtn = document.querySelector(".previuos-page-btn");

nextPageBtn.addEventListener("click", (event) => {
  if (Number(currentPage.textContent) < maxPages) {
    page++;
    currentPage.textContent = page;
    getList("movie", page);
  }
});

previuosPageBtn.addEventListener("click", (event) => {
  if (Number(currentPage.textContent) > 1) {
    page--;
    currentPage.textContent = page;
    getList("movie", page);
  }
});

// endPoint = `https://api.themoviedb.org/3/search/${type}?query=${query}&page=${page}`;
// DOM_VAR.searchForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   page = 1;
//   DOM_VAR.currentPage.textContent = page;

//   getMovies(currentType, page, DOM_VAR.movieSearcher.value);
//   DOM_VAR.movieSearcher.value = "";
// });

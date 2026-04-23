const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
import { createMovieBox } from "./functions.js";
async function getGenres() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    console.log(data.genres);
    displayGenresList(data.genres);
  } catch (error) {
    console.error(error);
    return null;
  }
}
getGenres();
const filterForm = document.querySelector(".filter-form");

const typeList = document.querySelector("#type-list");
let typeListValue = typeList.value;

const filterList = document.querySelector("#filter-list");
let filterListValue = filterList.value;

const yearList = document.querySelector("#year-list");
let yearListValue = yearList.value;

const date = new Date();

const yearsArray = [Number(date.getFullYear()), Number(date.getFullYear()) - 1];
function displayGenresList(array) {
  array.forEach((element) => {
    const newGenre = document.createElement("option");
    newGenre.setAttribute("value", element.id);
    newGenre.textContent = element.name;
    filterList.appendChild(newGenre);
  });
}
function displayYearsList(array) {
  array.forEach((element) => {
    const newYear = document.createElement("option");
    newYear.setAttribute("value", element);
    newYear.textContent = element;
    yearList.appendChild(newYear);
  });
}
displayYearsList(yearsArray);

const filterBtn = document.querySelector(".filter-btn");
const headerFilterContainer = document.querySelector(
  ".header__filter-container",
);
const closeFilters = document.querySelector(".close-filters");

filterBtn.addEventListener("click", (event) => {
  headerFilterContainer.classList.remove("hidden");
});
closeFilters.addEventListener("click", (event) => {
  headerFilterContainer.classList.add("hidden");
});

typeList.addEventListener("change", (event) => {
  typeListValue = event.target.value;
});
filterList.addEventListener("change", (event) => {
  filterListValue = event.target.value;
});
yearList.addEventListener("change", (event) => {
  yearListValue = event.target.value;
});
filterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  headerFilterContainer.classList.add("hidden");

  func(typeListValue, filterListValue, yearListValue);
});

const searchResult = document.querySelector(".search-result");

const type = "movie";
const year = 2024;
const genreId = 18;

async function func(type, genreId, year) {
  try {
    let endPoint;
    const BASE_URL = "https://api.themoviedb.org/3";

    // Ендпоінти для фільтрації
    const ENDPOINTS = {
      movie: `${BASE_URL}/discover/movie`,
      tv: `${BASE_URL}/discover/tv`,
    };
    const getDiscoverUrl = (type, genreId, year) => {
      const baseUrl = ENDPOINTS[type];

      // Визначаємо, який саме параметр року використовувати залежно від типу
      const yearParam =
        type === "movie"
          ? `primary_release_year=${year}`
          : `first_air_date_year=${year}`;

      return `${baseUrl}?api_key=${TOKEN}&with_genres=${genreId}&${yearParam}&language=en-US`;
    };
    const response = await fetch(getDiscoverUrl(type, genreId, year), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log(data);
    if (data.results.length === 0) {
      searchResult.textContent = "There are no information";
    } else {
      createMovieBox(data.results, searchResult);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

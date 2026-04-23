// IMPORTING
import "./scss/main.scss";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

import { createMovieBox } from "./functions.js";

// DOM VARIABLES
const trends = document.querySelector(".trends");
const trendsPoster = document.querySelector(".trends-poster-img");
const trendsHeader = document.querySelector(".trends-header");
const ratingMark = document.querySelector(".rating-mark");
const trendsOverview = document.querySelector(".trends-overview");

const topRatedBox = document.querySelector(".top-rated-box");
const upcomingBox = document.querySelector(".upcoming-box");

const moviesList = document.querySelector(".movies-list");

const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData(path, params = "") {
  try {
    const response = await fetch(`${BASE_URL}${path}?language=en-US${params}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error(`Помилка запиту до ${path}:`, error);
    return null; // Повертаємо null, щоб наступні функції знали, що даних немає
  }
}
let index = 0;
async function initApp() {
  const [trending, topRated, upcoming] = await Promise.all([
    fetchData("/movie/popular"),
    fetchData("/movie/top_rated"),
    fetchData("/movie/upcoming"),
  ]);

  if (trending) {
    trendsPoster.src = `https://image.tmdb.org/t/p/w500/${trending.results[0].poster_path}`;
    trendsHeader.textContent = trending.results[0].title;
    ratingMark.textContent = Math.round(trending.results[0].vote_average);
    trendsOverview.textContent = trending.results[0].overview;
    setInterval(() => {
      index++;
      if (index < trending.results.length - 1) {
        index++;
      } else if (index === trending.results.length - 1) {
        index = 0;
      }

      trendsPoster.src = `https://image.tmdb.org/t/p/w500/${trending.results[index].poster_path}`;
      trendsHeader.textContent = trending.results[index].title;
      ratingMark.textContent = Math.round(trending.results[index].vote_average);
      trendsOverview.textContent = trending.results[index].overview;
    }, 5000);
  }

  if (topRated) createMovieBox(topRated.results, topRatedBox);
  if (upcoming) createMovieBox(upcoming.results, upcomingBox);
}
initApp();

// filter-list

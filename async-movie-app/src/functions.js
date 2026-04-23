export function createMovieBox(array, insertInto) {
  insertInto.innerHTML = "";
  let newArray = array.map((element) => {
    return `<article class="movie-box">
            <img src="https://image.tmdb.org/t/p/w500/${element.poster_path || element.profile_path}" alt="${element.title}" />
            <h3>${element.title}</h3>
            
          </article>`;
  });
  newArray = newArray.join("");
  insertInto.innerHTML = newArray;
}

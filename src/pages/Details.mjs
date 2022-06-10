import { header,searchForm,headerTitle,headerArrow } from "../nodes/nodes.mjs";
import { getMovieDetails,getReleatedMovies } from "../service/getData.mjs";

export const Details = async ()=>{

    const id = location.hash.split('/')[2].split('-')[0];
    const movie = await getMovieDetails(id);
    const releatedMovies = await getReleatedMovies(id);

    header.classList.add('header-container--long');
    searchForm.classList.add('inactive');
    headerTitle.classList.add('inactive');
    headerArrow.classList.remove('inactive');

    header.style.background = `url('https://image.tmdb.org/t/p/w300/${movie.poster_path}')`

    const view = `
        <section id="movieDetail" class="movieDetail-container">
            <h1 class="movieDetail-title">${movie.title}</h1>
            <span class="movieDetail-score">${movie.vote_average}</span>
            <p class="movieDetail-description">
                ${movie.overview}
            </p>

            <article class="relatedMovies-container">
            <h2 class="relatedMovies-title">Películas similares</h2>
      
            <div class="relatedMovies-scrollContainer">
                ${releatedMovies.map(movie=>`
                    <div class="movie-container" id='${movie.id}-${movie.title}'>
                        <img
                        src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                        class="movie-img"
                        alt="${movie.title}"
                        />
                    </div>
                `).join('')}
            </div>
          </article>
        </section>

    `;
    
    return view;
}
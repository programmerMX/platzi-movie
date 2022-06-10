import { getMoviesByCategory } from "../service/getData.mjs";
import { headerArrow } from "../nodes/nodes.mjs";

export const Category = async ()=>{

    headerArrow.classList.remove('inactive')

    const id = location.hash.split('/')[2].split('-')[0];
    const movies = await getMoviesByCategory(id);

    console.log(movies);

    const view = `
        <section id="genericList" class="genericList-container ">
            ${movies.map(movie=>`
            <div class="movie-container" id='${movie.id}-${movie.title}'>
            <img
            src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
            class="movie-img"
            alt="${movie.title}"
            />
            </div>
            `).join('')}
        </section>
    `;

    return view;
}
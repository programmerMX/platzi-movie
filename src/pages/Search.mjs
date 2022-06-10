import { getMoviesBySearch } from "../service/getData.mjs";
import { headerArrow } from "../nodes/nodes.mjs";

export const Search = async ()=>{

    headerArrow.classList.remove('inactive');


    const movies = await 
        getMoviesBySearch(location.hash.split('#')[1].split('=')[1].split('%20').join(' '));
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


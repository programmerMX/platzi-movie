import { getTrendMovies } from "../service/getData.mjs";
import { headerArrow, header, searchForm, headerTitle,  } from "../nodes/nodes.mjs";



export const Trends = async ()=>{

    headerArrow.classList.remove('inactive');
    header.classList.remove('header-container--long');
    searchForm.classList.remove('inactive');
    headerTitle.classList.remove('inactive');
    header.style.background = ''

    const trendMovies =  await getTrendMovies();

    const view = `
        <section id="genericList" class="genericList-container ">
            ${trendMovies.map(movie=>`
                <div class="movie-container" id='${movie.id}-${movie.title}'>
                    <img
                    src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                    class="movie-img"
                    alt="${movie.title}"
                    />
                </div>
            `).join('')}
        </section>
    `

    return view;
}
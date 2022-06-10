import { getTrendMovies, getCategories } from "../service/getData.mjs";
import { headerArrow, header, searchForm, headerTitle,  } from "../nodes/nodes.mjs";

export const Home = async ()=>{

    headerArrow.classList.add('inactive')
    header.classList.remove('header-container--long');
    searchForm.classList.remove('inactive');
    headerTitle.classList.remove('inactive');
    header.style.background = ''


    const trendMovies =  await getTrendMovies();
    const categories = await getCategories();

    const view = `
        <section id="trendingPreview" class="trendingPreview-container">
            <div class="trendingPreview-header">
                <h2 class="trendingPreview-title">Tendencias</h2>
                <a href='#/trends'>
                    <button class="trendingPreview-btn">Ver más</button>
                </a>
            </div>

            <article class="trendingPreview-movieList">
                ${trendMovies.map(movie=>`
                    <div class="movie-container" id='${movie.id}-${movie.title}'>
                        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" 
                        class="movie-img" 
                        alt="Nombre de la película"/>
                    </div> 
                `).join('')}
            </article>
        </section>

        <section id="categoriesPreview" class="categoriesPreview-container">
            <h2 class="categoriesPreview-title">Categorías</h2>
        
            <article class="categoriesPreview-list">
                ${categories.map(category=>`
                    <div class="category-container">
                        <h3 id="id${category.id}" class="category-title">${category.name}</h3>
                    </div> 
                `).join('')}
            </article>
        </section>
    `
    return view;
}


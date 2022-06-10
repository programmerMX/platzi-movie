import { navigate } from "./routes/index.mjs";
import {searchBtn, searchFormInput, headerTitle, headerArrow} from './nodes/nodes.mjs'

window.addEventListener('DOMContentLoaded', navigate);
window.addEventListener('hashchange', navigate);

searchBtn.addEventListener('click', ()=>{
    if(searchFormInput.value !== ''){
        location.hash = `#/search=${searchFormInput.value}`
    } 
})

headerTitle.addEventListener('click', ()=>location.hash = '#/')

headerArrow.addEventListener('click', ()=>{
    window.history.back();
})

























// Html Elements.
const trendingPreviewMovieList = document.querySelector('.trendingPreview-movieList');
// const categoriesPreviewList = document.querySelector('.categoriesPreview-list')


//Implementada con axios
async function getTrendingPreview(){
    const {data} = await axiosInstance(`/trending/movie/day`);

    const movies = data.results

    const trendingListeTemplate = [];

    movies.forEach(movie => {
        let htmlCode = `
        <div class="movie-container" id='${movie.id}-${movie.title}'>
            <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" 
            class="movie-img" 
            alt="Nombre de la película"/>
        </div>
        `
        trendingListeTemplate.push(htmlCode);
    });

    //Articulo para peliculas en tendencia.
    trendingPreviewMovieList.innerHTML = trendingListeTemplate.join('')

    document.querySelectorAll('.movie-container').forEach(movie=> {
        movie.addEventListener('click', ()=>{
            location.hash = `movie=${movie.getAttribute('id')}`
            getMovieDetails(movie);
        })
    })
}

//Implementada con axios
async function getCategoriesPreview(){
    const {data} = await axiosInstance(`/genre/movie/list`);
    const categories = await data.genres;
    
    const template = [];

    categories.forEach(category=>{
        let htmlCode = `
            <div class="category-container">
                <h3 id="id${category.id}" class="category-title">${category.name}</h3>
            </div>
        `

        template.push(htmlCode)
    })

    categoriesPreviewList.innerHTML = template.join('')

    const categoryBtns = document.querySelectorAll('.category-title');

    categoryBtns.forEach(category=>{
        category.addEventListener('click', ()=>{
            getMoviesByCategory(category)
        })
    })
}



async function getByCategoryTest(){
    const {data} = await axiosInstance(`/discover/movie`, {
        params: {
            'with_genres': '10752'
        }
    });

    const movies = data.results;

    //const trendingListeTemplate = [];

    // movies.forEach(movie => {
    //     let htmlCode = `
    //     <div class="movie-container">
    //         <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" 
    //         class="movie-img" 
    //         alt="Nombre de la película"/>
    //     </div>
    //     `
    //     trendingListeTemplate.push(htmlCode);
    // });

    // //Articulo para peliculas en tendencia.
    // trendingPreviewMovieList.innerHTML = 
    //     //Template generado
    //     trendingListeTemplate.join('')
}


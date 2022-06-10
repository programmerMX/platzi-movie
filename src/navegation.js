let goBack = false;

window.addEventListener('DOMContentLoaded', navegatior, false)
window.addEventListener('hashchange', ()=>{
    if (goBack){
        getBeforeData();
        //goBack = false;
    }
    navegatior();
}, false)


 searchFormBtn.addEventListener('click', ()=>{
     if (searchInput.value !== '') {

        const query = generateSearchQuery(location.hash = `search=${searchInput.value}`)
        getMoviesBySearch(query);
    
     }


 })

 trendingBtn.addEventListener('click', ()=>{
     location.hash = 'trends'
 })

 arrowBtn.addEventListener('click', ()=>{
    goBack = true;
    window.history.back();
 })

 
function navegatior(){

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        moveDetailsPage();
    } else if(location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    } 
}



function homePage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    headerTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')

    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    arrowBtn.classList.add('inactive');


    getCategoriesPreview();
    getTrendingPreview();
}

function moveDetailsPage(){
    console.log('move details');

    headerSection.classList.add('header-container--long');
    headerSection.style.background = '';
    
    arrowBtn.classList.remove('inactive');
    movieDetailSection.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');

    genericSection.classList.add('inactive');
    arrowBtn.classList.add('header-arrow--white')
    trendingPreviewSection.classList.add('inactive');
    headerTitle.classList.add('inactive')
    searchForm.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
}

function categoriesPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    headerCategoryTitle.classList.remove('inactive');
    console.log();
    headerCategoryTitle.textContent = location.hash.split('=').splice(1,1).join('');

    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')

    trendingPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerTitle.classList.add('inactive')
    searchForm.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');

    renderMoviesByCategory();
;
}

function searchPage(){
    console.log(location.hash);
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    headerCategoryTitle.classList.add('inactive');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')
    genericSection.classList.remove('inactive');


    trendingPreviewSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    headerTitle.classList.remove('inactive')
    searchForm.classList.remove('inactive');
    categoriesPreviewSection.classList.add('inactive');

    renderMoviesBySearch();
}

function trendsPage(){
    console.log('trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    
    headerCategoryTitle.classList.add('inactive');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white')

    trendingPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    headerTitle.classList.add('inactive')
    searchForm.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
}

async function getMoviesByCategory(nodeCategory) {
    
    //MOVE TO CATEGORY PAGE
    location.hash = `category=${nodeCategory.textContent}`
    window.scroll({
        top: 0,
        left: 0
      });

      headerCategoryTitle.textContent = nodeCategory.textContent

        //GETTING MOVIE BY CATEGORY START.
      const {data} = await axiosInstance(`/trending/movie/day`);
      const movies = data.results;
  
      const categoryId = 
          nodeCategory.getAttribute('id').split('').splice(2,2).join('')
  
      const foundMovies = 
          movies.filter(movie=> movie.genre_ids.some(id => id === parseInt(categoryId)));

      localStorage.setItem('filteredMovies', JSON.stringify(foundMovies))

        //GETTING MOVIE BY CATEGORY END.

    renderMoviesByCategory();
}

async function renderMoviesByCategory(categoryElement){
   
    const movies = JSON.parse(localStorage.getItem('filteredMovies'))

    const template = [];

    if(movies.length > 0){
        movies.forEach(movie=>{
            console.log(movie);
            const html = `
                <div class="movie-container" id='${movie.id}-${movie.title}'>
                    <img
                    src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                    class="movie-img"
                    alt="Nombre de la película"
                    />
                </div>
            `
            template.push(html);
        })

        genericSection.innerHTML = template.join('');

        document.querySelectorAll('.movie-container').forEach(movie=> {
            movie.addEventListener('click', ()=>{
                location.hash = `movie=${movie.getAttribute('id')}`
                getMovieDetails(movie);
            })
        });
    } else genericSection.innerHTML = `Not found movies`
};

async function getMoviesBySearch(query){
    const {data} = await axiosInstance(`/search/movie`, {
        params: {
            query
        }
    })

    localStorage.setItem('wantedMovies', JSON.stringify(data.results))

    renderMoviesBySearch()
}

function renderMoviesBySearch(){

    window.scrollTo(0,0)

    const movies = JSON.parse(localStorage.getItem('wantedMovies'))

    const template = [];

    if(movies.length > 0){
        movies.forEach(movie=>{
            const html = `
                <div class="movie-container"  id='${movie.id}-${movie.title}'>
                    <img
                    src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                    class="movie-img"
                    alt="Nombre de la película"
                    />
                </div>
            `
            template.push(html);
        })

        genericSection.innerHTML = template.join('');
        document.querySelectorAll('.movie-container').forEach(movie=> {
            movie.addEventListener('click', ()=>{
                location.hash = `movie=${movie.getAttribute('id')}`
                getMovieDetails(movie);
            })
        });
    } else genericSection.innerHTML = `Not found movies`
}

function getBeforeData() {

    if (location.hash.startsWith('#search=')) {
        const query = generateSearchQuery(location.hash);
        getMoviesBySearch(query);
    }
    
}

function generateSearchQuery(hashValue){

    const [_, search] = hashValue.split('=')

    const query = search.split('%20').join(' ')

    return query;
}

async function getMovieDetails(){
    const [_,chosenMovie] = location.hash.split('=');
    const [id,movieName] = chosenMovie.split('-');

    const {data} = await axiosInstance(`/movie/${parseInt(id)}`);

    localStorage.setItem('movieDetails', JSON.stringify(data));

    renderMovieDetails();

    //agregar imagen de background al .header-container--long
    //
}

async function renderMovieDetails(){
    const movie = JSON.parse(localStorage.getItem('movieDetails'));
    const similarMovies = await getSimilarMovies(movie.id);

    console.log(similarMovies);

    headerSection.style.background = `url('https://image.tmdb.org/t/p/w300${movie.poster_path}')`

    const template = [
        `
            <h1 class="movieDetail-title">${movie.title}</h1>
            <span class="movieDetail-score">${movie.vote_average}</span>
            <p class="movieDetail-description">
                ${movie.overview}
            </p>

            <article class="categories-list">
          
            </article>

          <article class="relatedMovies-container">
          <h2 class="relatedMovies-title">Películas similares</h2>
    
          <div class="relatedMovies-scrollContainer">

            <div class="movie-container" id='${similarMovies[0].id}-${similarMovies[0].title}'>
              <img
                src="https://image.tmdb.org/t/p/w300${similarMovies[0].poster_path}"
                class="movie-img"
                alt="Nombre de la película"
              />
            </div>
            
            <div class="movie-container" id='${similarMovies[1].id}-${similarMovies[1].title}'>
              <img
                src="https://image.tmdb.org/t/p/w300${similarMovies[1].poster_path}"
                class="movie-img"
                alt="Nombre de la película"
              />
            </div>
            
            <div class="movie-container" id='${similarMovies[2].id}-${similarMovies[2].title}'>
              <img
                src="https://image.tmdb.org/t/p/w300${similarMovies[2].poster_path}"
                class="movie-img"
                alt="Nombre de la película"
              />
            </div>

            <div class="movie-container" id='${similarMovies[3].id}-${similarMovies[3].title}'>
              <img
                src="https://image.tmdb.org/t/p/w300${similarMovies[3].poster_path}"
                class="movie-img"
                alt="Nombre de la película"
              />
            </div>
          </div>
        </article>
        `
    ];

    movieDetailSection.innerHTML = template.join('');

}

async function getSimilarMovies(movie_id){
    const {data} = await axiosInstance(`/movie/${movie_id}/similar`);

    const similarMovies = [];

    for (let index = 1; index <= 4; index++) {
         similarMovies.push(data.results[index])
    }

    return similarMovies;    
}
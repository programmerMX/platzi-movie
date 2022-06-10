import { Category } from "../pages/Category.mjs";
import { Details } from "../pages/Details.mjs";
import { Home } from "../pages/Home.mjs";
import { Search } from "../pages/Search.mjs";
import { Trends } from "../pages/trends.mjs";
import {getHash} from '../service/getHash.mjs'

const routes = {
    '/': Home,
    '/search=':  Search,
    '/trends': Trends,
    '/categories': Category,
    '/details': Details
}

export const  navigate = async ()=>{

    const main = document.getElementById('main');

    const hash = getHash();

    console.log(hash);

    const renderPage = routes[hash] ? routes[hash] : 'Error 404';
    
    main.innerHTML = await renderPage();

    if(hash === '/'){
        const categoryTitle = document.querySelectorAll('.category-title');

        categoryTitle.forEach(category=>{
            category.addEventListener('click', ()=>{
                location.hash = 
                    `#/categories/${category.getAttribute('id').split('id')[1]}-${category.textContent}`
            })
        })
    }

   window.scroll({
    top:0
   })
  
   document.querySelectorAll('.movie-container').forEach(movie=>{
    movie.addEventListener('click', ()=>{
        location.hash = 
            `#/details/${movie.getAttribute('id').split('-')[0]}-${movie.getAttribute('id').split('-')[1].split(' ').join('-')}`
    })
   })
}

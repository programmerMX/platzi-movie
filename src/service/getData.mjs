import { API_KEY } from "../confidentials/confidential.mjs";

//Configuracion de axios
const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    params: {
        'api_key': API_KEY
    }
})

export const getTrendMovies = async ()=>{
    const {data} = await axiosInstance('/trending/movie/day');

    return data.results;
}

export const getCategories = async ()=>{
    const {data} = await axiosInstance('/genre/movie/list')

    return data.genres;
}

export const getMoviesBySearch = async (query)=>{
    const {data} = await axiosInstance('/search/movie', {
        params:{
            query
        }
    });

    return data.results;
}

export const getMoviesByCategory = async (id)=>{
    const {data} = await axiosInstance(`/discover/movie`, {
        params:{
            'with_genres': id
        }
    })

    return data.results;
}

export const getMovieDetails = async (movie_id)=>{
    const {data} = await axiosInstance(`/movie/${movie_id}`)

    return data;
}

export const getReleatedMovies = async (movie_id)=>{
    const {data} = await axiosInstance(`/movie/${movie_id}/similar`)

    return data.results;
}
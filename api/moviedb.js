import axios from 'axios';
import { apiKey } from '../screens/constants/index';

// endpoints

const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upComingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint =   `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// dynamic endpoint

const movieDetailEndpoint = (id)=>  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditEndpoint = (id)=>   `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMovieEndpoint = (id)=>   `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;


const personDetailEndpoint = (id)=>   `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id)=>   `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500= (path)=> path? `https://image.tmdb.org/t/p/w500${path}`: null
export const image342= (path)=> path? `https://image.tmdb.org/t/p/w342${path}`: null
export const image185= (path)=> path? `https://image.tmdb.org/t/p/w185${path}`: null

export const noImage= 'https://www.beelights.gr/assets/images/empty-image.png';
export const unKnownPerson='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const apiCall = async (endpoint, params) => {
   
    const option = {
        methode: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(option)
        return response.data

    } catch (error) {

        console.error('Error', error)

        return {}
    }
}

export const fetchTrendingMovies = () => {

    return apiCall(trendingMoviesEndpoint);

}
export const fetchUpcomingMovies = () => {

    return apiCall(upComingMoviesEndpoint);
    
}
export const fetchTopRatedMovies = () => {

    return apiCall(topRatedMoviesEndpoint);
    
}

export const fetchMovieDetail=(id)=>{

    return apiCall(movieDetailEndpoint(id))
}
export const fetchMovieCredit=(id)=>{

    return apiCall(movieCreditEndpoint(id))
}
export const fetchSimilarMovie=(id)=>{

    return apiCall(similarMovieEndpoint(id))
}

export const fetchPersonDetail=(id)=>{

    return apiCall(personDetailEndpoint(id))
}
export const fetchPersonMovie=(id)=>{

    return apiCall(personMoviesEndpoint(id))

}

export const fetchSearchMovie=(params)=>{

    return apiCall(searchMoviesEndpoint ,params)

}







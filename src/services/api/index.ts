const baseUrl = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const trending = `${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`
const topRated = `${baseUrl}/tv/top_rated?api_key=${API_KEY}&language=en-US`;
const baserUrl_IMG_EXTRA_SMALL = "https://image.tmdb.org/t/p/w45"
const baserUrl_posterSmall = "https://image.tmdb.org/t/p/w92"
const baseUrl_posterMid = "https://image.tmdb.org/t/p/w185";
const baseUrl_IMG_BIG = "https://image.tmdb.org/t/p/w1280";

function discover(type: string | undefined, genre: string | undefined, currentPage: number) {
    return `${baseUrl}/discover/${type}?api_key=${API_KEY}&adult=false&with_genres=${genre}&page=${currentPage}&with_original_language=en`
}

function getDetails(type: string | undefined , id : number | undefined){
    return `${baseUrl}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,images`
}

const getSearchUrl = (query: string, showType: string) =>`${baseUrl}/search/${showType}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`;

function getRecommenditons (type : string | undefined ,genre : string | undefined ,page : number){
    return `${baseUrl}/discover/${type}?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=100&vote_average.gte=7&with_genres=${genre}&page=${page}`
}

export {
    trending,
    topRated,
    baserUrl_posterSmall,
    baseUrl_posterMid,
    discover,
    getDetails,
    getSearchUrl,
    getRecommenditons,
    baseUrl_IMG_BIG,
    baserUrl_IMG_EXTRA_SMALL
}
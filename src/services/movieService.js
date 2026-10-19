const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export async function popularMovies(){
    const endpoint = await fetch(`https:////api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);

    if (!endpoint.ok){
        throw new Error("Failed to fetch data.");
    }

    const data = await endpoint.json();
    return data.results;
};

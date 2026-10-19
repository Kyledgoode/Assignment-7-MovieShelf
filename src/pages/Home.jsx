import MovieGrid from '../components/MovieGrid';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getPopularMovies();
        setMovies(movieData);
      } catch {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const displayMovies = searchResults || movies;

  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>
      <MovieGrid movies={displayMovies} />
    </main>
  );
};

export default Home;
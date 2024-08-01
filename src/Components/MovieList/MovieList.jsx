import React, { useState, useEffect } from 'react';
import './MovieList.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import MovieModal from '../MovieModal/MovieModal';

const MovieList = () => {
  const [movies, setMovies] = useState([]); 
  const [upcomingMovies, setUpcomingMovies] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [show, setShow] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [page, setPage] = useState(1); 

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=38ea5e7c8561a585923cb35fd520dfa3&page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUpcomingMovies((prevMovies) => [...prevMovies, ...data.results]); 
        setMovies((prevMovies) => [...prevMovies, ...data.results]); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page]); 

  useEffect(() => {
    if (searchQuery === '') {
      setMovies(upcomingMovies); 
      return;
    }

    setLoading(true);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=38ea5e7c8561a585923cb35fd520dfa3&query=${searchQuery}&page=1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.results); 
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [searchQuery]); 

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, [loading]);

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedMovie(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='block'>
      <div className="overlay"></div>
      <Form inline="true" className="search-form">
        <Form.Control
          type="text"
          placeholder="Search for a movie..."
          className="mr-sm-2"
          onChange={handleSearchChange}
          value={searchQuery}
        />
        <Button variant="danger" type="submit" disabled>
          Search
        </Button>
      </Form>

      {loading && <div>Loading...</div>}

      <div className="movies">
        {movies.map((movie, index) => (
          <Card key={index} style={{ width: '15rem' }} className='' onClick={() => handleShow(movie)}>
            <Card.Img variant="top" style={{ width: '100%' }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <Card.Title className='card-title'>{movie.title}</Card.Title>
          </Card>
        ))}
      </div>

      <MovieModal show={show} handleClose={handleClose} movie={selectedMovie} />
    </div>
  );
};

export default MovieList;

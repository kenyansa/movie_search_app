import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import Result from './Result';
import Search from './Search';

// Define TypeScript types
interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbRating: string;
  Plot: string;
//   [key: string]: any;  accommodates any additional properties
}

interface ResultItem {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

interface HomeState {
  search: string;
  results: ResultItem[];
  selected: Movie;
}

export default function Home() {
  const [state, setState] = useState<HomeState>({
    search: "",
    results: [],
    selected: {} as Movie,
  });

  useEffect(() => {
    axios.get('https://www.omdbapi.com/?apikey=b5382e81&type=movie&s=spider')
      .then(res => {
        setState(prevState => ({
          ...prevState,
          results: res.data.Search || []
        }));
      })
      .catch(err => console.log(err));
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setState(prevState => ({
      ...prevState,
      search: search
    }));
  };

  const openDetails = (id: string) => {
    axios.get(`https://www.omdbapi.com/?i=${id}&apikey=b5382e81`)
      .then(({ data }) => {
        setState(prevState => ({
          ...prevState,
          selected: data
        }));
      })
      .catch(err => console.log(err));
  };

  const SearchResult = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      axios.get(`https://www.omdbapi.com/?apikey=b5382e81&s=${state.search}`)
        .then(res => {
          setState(prevState => ({
            ...prevState,
            results: res.data.Search || []
          }));
        })
        .catch(err => console.log(err));
    }
  };

  const close = () => {
    setState(prevState => ({
      ...prevState,
      selected: {} as Movie
    }));
  };

  return (
    <div className="w-full main-wrapper flex flex-col items-center min-h-screen bg-gray-900 text-white">
      {state.selected.Title ? (
        <MovieDetails selected={state.selected} close={close} />
      ) : (
        <header className="w-full text-center mt-5">
          <h2 className="text-2xl font-bold">Movie Search</h2>
          <Search handleInput={handleInput} SearchResult={SearchResult} />
          <div className="container mx-auto mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {state.results.map((result, i) => (
                <div className="my-2" key={i}>
                  <Result result={result} openDetails={openDetails} />
                </div>
              ))}
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieDetails from './MovieDetails';
import Result from './Result';
import Search from './Search';
interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbRating: string;
  Plot: string;
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
    axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=fbad3dc2&type=movie&s=spider')
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
    axios.get(`https://www.omdbapi.com/?i=${id}&apikey=fbad3dc2`)
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
      axios.get(`https://www.omdbapi.com/?apikey=fbad3dc2&s=${state.search}`)
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
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-600 text-green-500">
      {state.selected.Title ? (
        <MovieDetails selected={state.selected} close={close} />
      ) : (
        <header className="w-full text-center mt-5 px-4">
          <h2 className="text-3xl font-bold mb-4">Movie Search</h2>
          <Search handleInput={handleInput} SearchResult={SearchResult} />
          <div className="container mx-auto mt-5 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {state.results.map((result, i) => (
                <div className="flex justify-center my-4" key={i}>
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

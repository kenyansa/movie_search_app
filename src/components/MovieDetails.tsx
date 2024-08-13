interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbRating: string;
  Plot: string;
}

interface MovieDetailsProps {
  selected: Movie;
  close: () => void;
}

export default function MovieDetails({ selected, close }: MovieDetailsProps) {
  return (
    <div className='flex flex-col justify-center items-center text-white p-4'>
      <h3 className='text-center font-bold underline text-green-500 text-2xl mb-4'>
        Movie Details
      </h3>
      <div className='w-full max-w-4xl mt-5'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 text-center'>
            <img
              src={selected.Poster}
              alt={selected.Title}
              className='w-full h-auto max-w-xs mx-auto mb-4'
            />
          </div>
          <div className='w-full md:w-1/2 text-red-500 p-4'>
            <h2 className='text-2xl font-semibold mb-2'>{selected.Title}</h2>
            <p className='mb-2'>{selected.Year}</p>
            <p className='mb-2'>Rating: {selected.imdbRating}</p>
            <p className='mb-4'>{selected.Plot}</p>
            <button
              onClick={close}
              className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

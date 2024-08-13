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
      <h3 className='text-center font-bold  text-green-500 text-2xl mb-4'>
        Movie Details
      </h3>
      <div className='w-full max-w-4xl mt-5'>
        <div className='flex flex-col md:flex-row'>
          <div className='w-full md:w-1/2 text-center'>
            <img
              src={selected.Poster}
              alt={selected.Title}
              className='w-full h-auto max-w-xs mx-auto mb-4 rounded-lg'
            />
          </div>
          <div className='w-full md:w-1/2 text-yellow-500 p-6 bg-gray-800 rounded-lg shadow-lg'>
            <h2 className='text-3xl font-extrabold mb-3 text-white'>{selected.Title}</h2>
            <p className=' font-semibold mb-3 text-gray-300'>Year of Release: <span className='font-semibold'>{selected.Year}</span></p>
            <p className='mb-3 text-gray-300'>Rating: <span className='font-semibold'>{selected.imdbRating}</span></p>
            <p className='font-semibold mb-4 text-gray-200 text-left'>{selected.Plot}</p>
            <button
                onClick={close}
                className='bg-red-600 text-white  w-full py-3 px-6 rounded-lg hover:bg-red-700'
            >
                Close
            </button>
            </div>

        </div>
      </div>
    </div>
  );
}

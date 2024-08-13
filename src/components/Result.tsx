
interface ResultItem {
  Poster: string;
  Title: string;
  imdbID: string;
}

interface ResultProps {
  result: ResultItem;
  openDetails: (id: string) => void;
}

export default function Result({ result, openDetails }: ResultProps) {
  return (
    <div
      className='cursor-pointer'
      onClick={() => openDetails(result.imdbID)}
    >
      <div className='border-gray-700 border-4'>
        <img
          src={result.Poster}
          alt={result.Title}
          className='w-full h-auto object-cover'
        />
      </div>
      <div className='bg-gray-800 text-white p-2'>
        <h5 className='text-lg font-semibold'>{result.Title}</h5>
      </div>
    </div>
  );
}

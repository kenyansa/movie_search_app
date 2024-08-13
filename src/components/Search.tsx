interface SearchProps {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  SearchResult: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Search({ handleInput, SearchResult }: SearchProps) {
  return (
    <div className='search-input mt-3 mb-5'>
      <input
        type='text'
        name='movie'
        className='w-50 p-2'
        placeholder='Search Movie....'
        onChange={handleInput}
        onKeyDown={SearchResult}
      />
    </div>
  );
}

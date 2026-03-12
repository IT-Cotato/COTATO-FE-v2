import SearchIcon from '@repo/ui/assets/icons/search.svg';
import XIcon from '@repo/ui/assets/icons/cancel.svg';
interface SearchBarProps {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  disabled?: boolean;
}

export const SearchBar = ({
  keyword,
  onKeywordChange,
  onSearch,
  disabled,
}: SearchBarProps) => {
  return (
    <form
      role='search'
      aria-label='부원 검색'
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className='flex w-full shrink-0 flex-row items-center gap-2.5 rounded-[10px] bg-neutral-50 px-4 py-2.25 md:ml-auto md:h-12.5 md:w-75 md:py-2.75'>
      <SearchIcon
        aria-hidden='true'
        className='h-4 w-4 text-neutral-600'
        focusable='false'
      />
      <input
        type='search'
        placeholder='SEARCH'
        aria-label='부원 검색'
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        disabled={disabled}
        className='text-body-l flex-1 bg-transparent font-normal outline-none placeholder:text-neutral-600 [&::-webkit-search-cancel-button]:hidden'
      />
      {keyword && (
        <button
          type='button'
          aria-label='검색어 지우기'
          onClick={() => onKeywordChange('')}
          disabled={disabled}>
          <XIcon
            aria-hidden='true'
            className='h-3 w-3 text-neutral-600'
            focusable='false'
          />
        </button>
      )}
    </form>
  );
};

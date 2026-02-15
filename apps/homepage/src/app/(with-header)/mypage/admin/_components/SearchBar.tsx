import SearchIcon from '@repo/ui/assets/icons/search.svg';

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
      className='ml-auto flex h-12.5 w-75 shrink-0 flex-row items-center gap-2.5 rounded-[10px] bg-neutral-50 px-4 py-2.75'>
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
        className='text-body-l w-full font-normal outline-none placeholder:text-neutral-600'
      />
    </form>
  );
};

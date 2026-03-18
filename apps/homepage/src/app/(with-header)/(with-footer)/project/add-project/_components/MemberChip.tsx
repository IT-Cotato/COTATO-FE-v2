import {useState, useEffect} from 'react';
import XIcon from '@repo/ui/assets/icons/cancel.svg';

export const MemberChip = ({
  name,
  onDelete,
  onUpdate,
}: {
  name: string;
  onDelete: () => void;
  onUpdate: (name: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);

  useEffect(() => {
    setValue(name);
  }, [name]);

  const handleFinishEditing = () => {
    const finalValue = value.trim() === '' ? '감직이' : value;
    onUpdate(finalValue);
    setValue(finalValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      handleFinishEditing();
    }
    if (e.key === 'Escape') {
      setValue(name);
      setIsEditing(false);
    }
  };

  const bgColor = name === '감직이' ? 'bg-neutral-400' : 'bg-primary';

  return (
    <div
      className={`group relative flex h-8 items-center rounded-[20px] px-3.75 pr-10 text-white transition-all lg:px-5.75 lg:py-1.25 ${bgColor} ${
        isEditing ? 'lg:pr-12' : 'lg:focus-within:pr-12 lg:hover:pr-12'
      }`}
      role='group'
      aria-label={`팀원 ${name}`}>
      {isEditing ? (
        <input
          autoFocus
          className='text-h5 w-16 bg-transparent font-semibold'
          value={value}
          aria-label='이름 수정'
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleFinishEditing}
        />
      ) : (
        <span
          className='text-h5 cursor-pointer font-semibold'
          role='button'
          tabIndex={0}
          aria-label={`${name}, 수정하려면 엔터를 누르세요`}
          onClick={() => setIsEditing(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setIsEditing(true);
            }
          }}>
          {name}
        </span>
      )}
      <button
        type='button'
        onClick={onDelete}
        aria-label={`${name} 삭제`}
        className={`absolute right-3 lg:right-5 ${isEditing ? 'block' : 'block lg:hidden lg:group-focus-within:block lg:group-hover:block'} }`}>
        <XIcon className='h-3 w-3 text-white' aria-hidden='true' />
      </button>
    </div>
  );
};

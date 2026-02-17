import {useState, useEffect} from 'react';
import XIcon from '@/assets/cancel/cancel.svg';

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
      className={`group relative flex h-8 items-center rounded-[20px] px-5.75 py-1.25 text-white transition-all hover:pr-12 ${bgColor}`}
      role='group'
      aria-label={`팀원 ${name}`}>
      {isEditing ? (
        <input
          autoFocus
          className='text-h5 w-16 bg-transparent'
          value={value}
          aria-label='이름 수정'
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleFinishEditing}
        />
      ) : (
        <span
          className='text-h5 cursor-pointer'
          role='button'
          tabIndex={0}
          aria-label={`${name}, 수정하려면 엔터를 누르세요`}
          onClick={() => setIsEditing(true)}>
          {name}
        </span>
      )}
      <button
        onClick={onDelete}
        className='absolute right-5 hidden group-hover:block'
        aria-label={`${name} 삭제`}>
        <XIcon className='h-3 w-3' aria-hidden='true' />
      </button>
    </div>
  );
};

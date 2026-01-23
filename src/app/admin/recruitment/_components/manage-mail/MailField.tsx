import {useRef} from 'react';

interface MailFieldProps {
  isEditing: boolean;
  content: string;
  setContent: (val: string) => void;
}

export const MailField = ({isEditing, content, setContent}: MailFieldProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className='h-89 w-full rounded-[10px] bg-neutral-50 px-7.75 py-4.5'>
      <div
        ref={scrollRef}
        className='custom-scrollbar h-full w-full overflow-y-auto'>
        {isEditing ? (
          <textarea
            className='flex min-h-full w-full resize-none bg-transparent text-body-m text-black outline-none'
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            ref={(el) => {
              if (el) {
                el.style.height = 'auto';
                el.style.height = `${el.scrollHeight}px`;
              }
            }}
            autoFocus
            spellCheck={false}
          />
        ) : (
          <div className='w-full text-body-m whitespace-pre-wrap text-black'>
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

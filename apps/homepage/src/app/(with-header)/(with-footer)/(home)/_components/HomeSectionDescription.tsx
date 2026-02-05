interface HomeSectionDescriptionProps {
  title: string;
  descriptions: string[];
  align?: 'start' | 'center' | 'end';
}

export const HomeSectionDescription = ({
  title,
  descriptions,
  align = 'start',
}: HomeSectionDescriptionProps) => {
  const alignmentClass = {
    start: 'items-start text-start',
    center: 'items-center text-center',
    end: 'items-end text-end',
  };

  return (
    <div className={`flex flex-col gap-5 ${alignmentClass[align]}`}>
      <h2 className='text-h2 break-keep text-neutral-800'>{title}</h2>
      <div className='text-h5 flex flex-col break-keep text-neutral-500'>
        {descriptions.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

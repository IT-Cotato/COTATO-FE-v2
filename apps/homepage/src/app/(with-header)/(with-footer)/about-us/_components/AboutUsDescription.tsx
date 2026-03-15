'use client';

interface AboutUsDescriptionProps {
  title: string;
  subTitle: string;
  subTitleOption?: string;
  titleColor: string;
  subTitleColor: string;
  className?: string;
}

export const AboutUsDescription = ({
  title,
  subTitle,
  subTitleOption,
  titleColor,
  subTitleColor,
  className = 'items-center text-center',
}: AboutUsDescriptionProps) => {
  return (
    <div className={`z-20 flex w-full flex-col gap-3 sm:gap-12.5 ${className}`}>
      <h2
        className={`text-h5 sm:text-h2 z-10 w-full font-bold whitespace-pre-line ${titleColor}`}>
        {title}
      </h2>

      <div className={`flex w-full flex-col ${className}`}>
        <h4
          className={`text-body-l sm:text-h4 whitespace-pre-line ${subTitleColor}`}>
          {subTitle}
        </h4>
        {subTitleOption && (
          <h4
            className={`text-body-l sm:text-h4 whitespace-pre-line ${subTitleColor}`}>
            {subTitleOption}
          </h4>
        )}
      </div>
    </div>
  );
};

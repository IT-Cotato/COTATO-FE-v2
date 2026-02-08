interface AboutUsDescriptionProps {
  title: string;
  subTitle: string;
  subTitleOption?: string;

  titleColor: string;
  subTitleColor: string;
}

export const AboutUsDescription = ({
  title,
  subTitle,
  subTitleOption,
  titleColor,
  subTitleColor,
}: AboutUsDescriptionProps) => {
  return (
    <div className='flex flex-col gap-12.5'>
      <h2 className={`text-h2 z-10 px-4 text-center font-bold ${titleColor}`}>
        {title}
      </h2>

      <div className='flex flex-col text-center'>
        <h4 className={`text-h4 ${subTitleColor}`}>{subTitle}</h4>
        {subTitleOption && (
          <h4 className={`text-h4 ${subTitleColor}`}>{subTitleOption}</h4>
        )}
      </div>
    </div>
  );
};

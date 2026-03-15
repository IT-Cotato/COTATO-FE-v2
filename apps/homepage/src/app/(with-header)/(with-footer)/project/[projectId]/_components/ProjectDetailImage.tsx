import Image from 'next/image';
import {ProjectDetail} from '@/schemas/project/project.schema';

export const ProjectDetailImage = ({
  data,
  isSingle,
}: {
  data: ProjectDetail;
  isSingle?: boolean;
}) => {
  if (!data.imageInfos || data.imageInfos.length === 0) return null;

  // 모바일에서 상단에 하나만 띄울 때
  if (isSingle) {
    return (
      <div className='w-full overflow-hidden'>
        <Image
          src={data.imageInfos[0].imageUrl}
          alt='프로젝트 썸네일 이미지'
          width={0}
          height={0}
          sizes='1100px'
          style={{width: '100%', height: 'auto'}}
          unoptimized
        />
      </div>
    );
  }

  return (
    <section className='flex w-full flex-col' aria-label='프로젝트 상세 이미지'>
      {data.imageInfos.map((img, index) => (
        <Image
          key={img.imageId}
          src={img.imageUrl}
          alt={`${data.name} 상세 이미지 ${index + 1}`}
          width={0}
          height={0}
          sizes='1100px'
          style={{width: '100%', height: 'auto'}}
          unoptimized={true}
        />
      ))}
    </section>
  );
};

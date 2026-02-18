import Image from 'next/image';
import {ProjectDetail} from '@/schemas/project/project.schema';

export const ProjectDetailImage = ({data}: {data: ProjectDetail}) => {
  if (!data.imageInfos || data.imageInfos.length === 0) return null;

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
        />
      ))}
    </section>
  );
};

import Image from 'next/image';
import {ProjectDetail} from '@/schemas/project/project.schema';

export const ProjectDetailImage = ({data}: {data: ProjectDetail}) => (
  <section className='flex w-full flex-col'>
    {data.imageInfos.map((img) => (
      <Image
        key={img.imageId}
        src={img.imageUrl}
        alt='project-img'
        width={0}
        height={0}
        sizes='1100px'
        style={{width: '100%', height: 'auto'}}
      />
    ))}
  </section>
);

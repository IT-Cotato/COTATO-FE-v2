'use client';

import {HomepageContentImage} from '@/components/homepage-images/HomepageContentImage';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {AboutUsActivity} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsMainActivitiesContainer';

interface AboutUsMobileMainActivitiesContainerProps {
  activities: AboutUsActivity[];
  initialSlide?: number;
}

export const AboutUsMobileMainActivitiesContainer = ({
  activities,
  initialSlide = 0,
}: AboutUsMobileMainActivitiesContainerProps) => {
  return (
    <div className='z-10 block w-full px-6 lg:hidden'>
      <Swiper
        initialSlide={initialSlide}
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{clickable: true}}
        className='activity-swiper pb-12!'>
        {activities.map((activity) => (
          <SwiperSlide key={activity.id}>
            <div className='relative mx-auto h-114.5 max-w-120 cursor-pointer overflow-hidden rounded-lg'>
              <div className='relative h-full w-full'>
                <HomepageContentImage
                  slot={activity.slot}
                  fallbackSrc={activity.src}
                  desktopFrom='lg'
                  alt=''
                  unoptimized
                  className='object-cover'
                />
                <div className='absolute inset-0 z-10 bg-black/50' />
                <div className='absolute inset-0 z-20 flex flex-col justify-between p-10'>
                  <h3 className='text-h3 font-bold text-neutral-50'>
                    {activity.title}
                  </h3>

                  <p className='text-body-m max-h-[70%] overflow-y-auto overscroll-contain whitespace-pre-line text-neutral-50'>
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

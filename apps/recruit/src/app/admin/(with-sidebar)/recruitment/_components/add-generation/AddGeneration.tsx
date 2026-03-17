import {AddGenerationContainer} from '@/app/admin/(with-sidebar)/recruitment/_components/add-generation/AddGenerationContainer';

export const AddGeneration = () => {
  return (
    <section className='flex w-full flex-col gap-2.5 lg:gap-5'>
      <h2 className='text-h5 lg:text-h4 px-2.5 font-bold lg:px-0'>
        기수 추가하기
      </h2>
      <AddGenerationContainer />
    </section>
  );
};

import {AddGenerationContainer} from '@/app/admin/recruitment/_components/add-generation/AddGenerationContainer';

export const AddGeneration = () => {
  return (
    <section className='flex w-full flex-col gap-5'>
      <h2 className='text-h4'>기수 추가하기</h2>
      <AddGenerationContainer />
    </section>
  );
};

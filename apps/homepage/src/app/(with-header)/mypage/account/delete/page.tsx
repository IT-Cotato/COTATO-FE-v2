import {DeleteAccount} from '@/app/(with-header)/mypage/account/delete/_containers/DeleteAccount';

export default function DeletePage() {
  return (
    <section className='flex flex-col px-6 py-10 md:min-w-250 md:px-11.25 md:py-12.5'>
      <DeleteAccount />
    </section>
  );
}

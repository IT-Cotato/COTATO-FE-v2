import {DeleteAccount} from '@/app/(with-header)/mypage/account/delete/_containers/DeleteAccount';

export default function DeletePage() {
  return (
    <section className='flex flex-col px-6 py-10 lg:min-w-250 lg:px-11.25 lg:py-12.5'>
      <DeleteAccount />
    </section>
  );
}

import {Button} from '@repo/ui/components/buttons/Button';

export default function Home() {
  return (
    <>
      <p className='text-primary'>home</p>
      <Button
        label='모노레포 packages/ui에서 가져온 버튼 컴포넌트임'
        backgroundColor='primary'
      />
    </>
  );
}

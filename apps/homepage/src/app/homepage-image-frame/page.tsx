import {notFound} from 'next/navigation';
import {HomepageImageSlotSchema} from '@/schemas/homepage-images.schema';
import {HomepageImageFrameProbe} from '@/components/homepage-images/HomepageImageFrameProbe';

export const metadata = {robots: {index: false, follow: false}};

/** 공개 홈페이지 부품을 표시하는 읽기 전용 미리보기다. 업로드·저장 API는 제공하지 않는다. */
export default async function HomepageImageFramePage({
  searchParams,
}: {
  searchParams: Promise<{slot?: string}>;
}) {
  const parsed = HomepageImageSlotSchema.safeParse((await searchParams).slot);
  if (!parsed.success) notFound();
  return <HomepageImageFrameProbe key={parsed.data} slot={parsed.data} />;
}

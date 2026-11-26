import {notFound} from 'next/navigation';
import {LocalHomepageImagePreview} from '@/components/homepage-images/LocalHomepageImagePreview';

export default function LocalHomepageImagesPage() {
  if (
    process.env.NODE_ENV !== 'development' ||
    process.env.NEXT_PUBLIC_HOMEPAGE_IMAGE_PREVIEW !== 'true'
  )
    notFound();
  return <LocalHomepageImagePreview />;
}

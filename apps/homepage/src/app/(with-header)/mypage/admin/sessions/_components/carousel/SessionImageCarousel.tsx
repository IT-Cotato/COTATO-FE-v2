import {SessionImage} from '@/schemas/admin/admin-sessions.schema';
import {SessionImageCarouselEdit} from '@/app/(with-header)/mypage/admin/sessions/_components/carousel/SessionImageCarouselEdit';
import {SessionImageCarouselView} from '@/app/(with-header)/mypage/admin/sessions/_components/carousel/SessionImageCarouselView';

interface SessionImageCarouselViewProps {
  mode: 'view';
  images: SessionImage[];
}

interface SessionImageCarouselEditProps {
  mode: 'edit';
  sessionId: number;
  images: SessionImage[];
  onChange: (updater: (prev: SessionImage[]) => SessionImage[]) => void;
}

type SessionImageCarouselProps =
  | SessionImageCarouselViewProps
  | SessionImageCarouselEditProps;

export const SessionImageCarousel = (props: SessionImageCarouselProps) => {
  if (props.mode === 'edit') {
    const {sessionId, images, onChange} = props;
    return (
      <SessionImageCarouselEdit
        sessionId={sessionId}
        images={images}
        onChange={onChange}
      />
    );
  }

  return <SessionImageCarouselView images={props.images} />;
};

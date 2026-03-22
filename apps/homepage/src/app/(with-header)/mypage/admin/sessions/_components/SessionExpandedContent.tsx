import {SessionData, SessionImage} from '@/schemas/admin/admin-sessions.schema';
import {SessionDetail} from '@/app/(with-header)/mypage/admin/sessions/_components/SessionDetail';
import {SessionImageCarousel} from '@/app/(with-header)/mypage/admin/sessions/_components/carousel/SessionImageCarousel';

interface SessionExpandedContentViewProps {
  mode: 'view';
  session: SessionData;
  showCarousel?: boolean;
}

interface SessionExpandedContentEditProps {
  mode: 'edit';
  form: SessionData;
  onChange: (updater: (prev: SessionData) => SessionData) => void;
  showCarousel?: boolean;
}

type SessionExpandedContentProps =
  | SessionExpandedContentViewProps
  | SessionExpandedContentEditProps;

export const SessionExpandedContent = (props: SessionExpandedContentProps) => {
  const {showCarousel = true} = props;

  if (props.mode === 'edit') {
    const {form, onChange} = props;

    const handleImagesChange = (
      updater: (prev: SessionImage[]) => SessionImage[]
    ) => onChange((prev) => ({...prev, images: updater(prev.images)}));

    return (
      <div className='flex flex-col justify-center md:flex-row md:gap-7'>
        {showCarousel && (
          <SessionImageCarousel
            mode='edit'
            sessionId={form.sessionId}
            images={form.images}
            onChange={handleImagesChange}
          />
        )}
        <SessionDetail mode='edit' form={form} onChange={onChange} />
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row md:gap-7'>
      {showCarousel && (
        <SessionImageCarousel mode='view' images={props.session.images} />
      )}
      <SessionDetail mode='view' session={props.session} />
    </div>
  );
};

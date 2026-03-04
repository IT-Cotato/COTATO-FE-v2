import {SessionData, SessionImage} from '@/schemas/admin/admin-sessions.schema';
import {SessionDetail} from '@/app/(with-header)/mypage/admin/sessions/_components/SessionDetail';
import {SessionImageCarousel} from '@/app/(with-header)/mypage/admin/sessions/_components/carousel/SessionImageCarousel';

interface SessionExpandedContentViewProps {
  mode: 'view';
  session: SessionData;
}

interface SessionExpandedContentEditProps {
  mode: 'edit';
  form: SessionData;
  onChange: (updater: (prev: SessionData) => SessionData) => void;
}

type SessionExpandedContentProps =
  | SessionExpandedContentViewProps
  | SessionExpandedContentEditProps;

export const SessionExpandedContent = (props: SessionExpandedContentProps) => {
  if (props.mode === 'edit') {
    const {form, onChange} = props;

    const handleImagesChange = (
      updater: (prev: SessionImage[]) => SessionImage[]
    ) => onChange((prev) => ({...prev, images: updater(prev.images)}));

    return (
      <div className='flex gap-7'>
        <SessionImageCarousel
          mode='edit'
          sessionId={form.sessionId}
          images={form.images}
          onChange={handleImagesChange}
        />
        <SessionDetail mode='edit' form={form} onChange={onChange} />
      </div>
    );
  }

  return (
    <div className='flex gap-7'>
      <SessionImageCarousel mode='view' images={props.session.images} />
      <SessionDetail mode='view' session={props.session} />
    </div>
  );
};

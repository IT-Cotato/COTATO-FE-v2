import {SessionData} from '@/schemas/admin/session.schema';
import {SessionDetail} from './SessionDetail';

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
  return (
    <div className='flex gap-7'>
      <div className='relative h-57.5 w-87.5 shrink-0 overflow-hidden rounded-[10px] bg-neutral-200'>
        {/* TODO: SessionImageCarousel */}
      </div>
      {props.mode === 'edit' ? (
        <SessionDetail mode='edit' form={props.form} onChange={props.onChange} />
      ) : (
        <SessionDetail mode='view' session={props.session} />
      )}
    </div>
  );
};

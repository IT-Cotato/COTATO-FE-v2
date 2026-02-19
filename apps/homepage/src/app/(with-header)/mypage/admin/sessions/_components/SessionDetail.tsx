'use client';

import {SessionData} from '@/schemas/admin/session.schema';
import {SessionDetailView} from './SessionDetailView';
import {SessionEditForm} from './SessionEditForm';

interface SessionDetailViewProps {
  mode: 'view';
  session: SessionData;
}

interface SessionDetailEditProps {
  mode: 'edit';
  form: SessionData;
  onChange: (updater: (prev: SessionData) => SessionData) => void;
}

type SessionDetailProps = SessionDetailViewProps | SessionDetailEditProps;

export const SessionDetail = (props: SessionDetailProps) => {
  if (props.mode === 'edit') {
    return <SessionEditForm form={props.form} onChange={props.onChange} />;
  }

  return <SessionDetailView session={props.session} />;
};

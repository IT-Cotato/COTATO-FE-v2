'use client';

import {AdminApplicationFormTabs} from '@/app/admin/(with-sidebar)/application-form/_components/form/AdminApplicationFormTabs';
import {ApplicationFormEdit} from '@/app/admin/(with-sidebar)/application-form/_components/form/ApplicationFormEdit';
import {ApplicationFormView} from '@/app/admin/(with-sidebar)/application-form/_components/form/ApplicationFormView';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

interface AdminApplicationFormProps {
  isEditing: boolean;
}

export const AdminApplicationForm = ({
  isEditing,
}: AdminApplicationFormProps) => {
  return (
    <div className='flex flex-col gap-11.75 rounded-[10px] border border-neutral-300 px-6 py-5'>
      <SuspenseWrapper>
        <AdminApplicationFormTabs />
      </SuspenseWrapper>
      <div className='flex flex-col gap-7.5'>
        {isEditing ? <ApplicationFormEdit /> : <ApplicationFormView />}
      </div>
    </div>
  );
};

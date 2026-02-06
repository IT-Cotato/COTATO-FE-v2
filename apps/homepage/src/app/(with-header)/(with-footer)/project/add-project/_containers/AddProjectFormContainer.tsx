'use client';
import {PeriodField} from '@/app/(with-header)/(with-footer)/project/add-project/_components/PeriodField';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {useState} from 'react';

export const AddProjectFormContainer = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<string>('12기');
  const [selectedActivity, setSelectedActivity] = useState<string>('전체');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const generations = ['12기', '11기', '10기', '9기']; //나중에 API 데이터로 연동하기
  const activities = ['전체', '데모데이', '해커톤'];
  return (
    <section className='flex w-full max-w-275 flex-col gap-7.5 py-7.5'>
      <div className='flex justify-between'>
        <div className='flex gap-6.25'>
          <Dropdown
            placeholder='기수'
            value={selectedGeneration}
            options={generations}
            onSelect={(value) => setSelectedGeneration(value)}
          />
          <Dropdown
            placeholder='활동'
            value={selectedActivity}
            options={activities}
            onSelect={(value) => setSelectedActivity(value)}
          />
        </div>
      </div>
      <PeriodField
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
    </section>
  );
};

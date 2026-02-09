'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {ProjectSection} from '@/app/(with-header)/(with-footer)/project/_components/ProjectSection';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {Button} from '@repo/ui/components/buttons/Button';
import {ROUTES} from '@/constants/routes';
import {MOCK_GENERATIONS} from '@/mocks/project/mock-project';
import {ACTIVITY_MAP} from '@/constants/project/project-activity';

export const ProjectContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const generations = MOCK_GENERATIONS;
  const activities = Object.values(ACTIVITY_MAP);

  const genParam =
    searchParams.get('gen') || generations[0].generationId.toString();
  const actParam = searchParams.get('act') || 'demoday';

  const selectedGenLabel = `${genParam}기`;
  const selectedActLabel = ACTIVITY_MAP[actParam] || '데모데이';

  const updateQuery = (key: 'gen' | 'act', value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set('page', '1'); // 필터 변경 시 무조건 1페이지로
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className='flex w-full min-w-275 flex-col gap-7.5 py-7.5'>
      <div className='flex justify-between'>
        <div className='flex gap-6 px-6'>
          <Dropdown
            placeholder='기수'
            value={selectedGenLabel}
            options={generations.map((g) => `${g.generationId}기`)}
            onSelect={(label) => {
              const id = label.replace('기', '');
              updateQuery('gen', id);
            }}
          />
          <Dropdown
            placeholder='활동'
            value={selectedActLabel}
            options={activities}
            onSelect={(label) => {
              const code = Object.keys(ACTIVITY_MAP).find(
                (key) => ACTIVITY_MAP[key] === label
              );
              if (code) updateQuery('act', code);
            }}
          />
        </div>
        <Button
          label='추가하기'
          labelTypo='body_l'
          width={127}
          height={40}
          onClick={() => router.push(ROUTES.ADD_PROJECT())}
        />
      </div>
      <ProjectSection generation={genParam} activity={actParam} />
    </section>
  );
};

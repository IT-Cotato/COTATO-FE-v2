'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {ProjectSection} from './ProjectSection';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {Button} from '@repo/ui/components/buttons/Button';
import {ROUTES} from '@/constants/routes';
import {ACTIVITY_MAP} from '@/constants/project/project-activity';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.queries';
import {useCallback} from 'react';

export const ProjectContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {data: generations = [], isLoading} = useGenerationQuery();
  const activities = Object.values(ACTIVITY_MAP);

  const genParam = searchParams.get('gen');
  const currentGen =
    genParam ||
    (generations.length > 0 ? generations[0].generationId.toString() : null);

  const actParam = searchParams.get('act') || 'DEMODAY';

  const updateQuery = useCallback(
    (key: 'gen' | 'act', value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const selectedGenLabel = currentGen ? `${currentGen}기` : '기수 선택';
  const selectedActLabel =
    ACTIVITY_MAP[actParam as keyof typeof ACTIVITY_MAP] || '데모데이';

  if (isLoading)
    return (
      <div className='flex min-h-100 items-center justify-center'>Spinner</div>
    );

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
                (key) =>
                  ACTIVITY_MAP[key as keyof typeof ACTIVITY_MAP] === label
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
      {generations.length === 0 && !isLoading ? (
        <div className='flex min-h-100 w-full items-center justify-center text-neutral-400'>
          등록된 기수 정보가 없습니다.
        </div>
      ) : (
        currentGen && (
          <ProjectSection generation={currentGen} activity={actParam} />
        )
      )}
    </section>
  );
};

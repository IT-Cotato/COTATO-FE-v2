'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {useCallback, useMemo} from 'react';
import {ProjectSection} from './ProjectSection';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {Button} from '@repo/ui/components/buttons/Button';
import {ROUTES} from '@/constants/routes';
import {ACTIVITY_MAP} from '@/constants/project/project-activity';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.queries';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

export const ProjectContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const genParam = searchParams.get('gen');
  const actParam = searchParams.get('act') || 'demoday';

  const {data: generations = [], isLoading} = useGenerationQuery();

  const sortedGenerations = useMemo(() => {
    return [...generations].sort((a, b) => b.generationId - a.generationId);
  }, [generations]);

  const currentGen = useMemo(() => {
    if (genParam) return genParam;
    return sortedGenerations.length > 0
      ? sortedGenerations[0].generationId.toString()
      : null;
  }, [genParam, sortedGenerations]);

  const selectedGenLabel = currentGen ? `${currentGen}기` : '기수 선택';
  const selectedActLabel = ACTIVITY_MAP[actParam] || '데모데이';
  const activityLabels = useMemo(() => Object.values(ACTIVITY_MAP), []);

  const updateQuery = useCallback(
    (key: 'gen' | 'act', value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  if (isLoading) {
    return (
      <div className='flex min-h-100 items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <section className='flex w-full min-w-275 flex-col gap-7.5 py-7.5'>
      <div className='flex justify-between'>
        <div className='flex gap-6 px-6'>
          <Dropdown
            placeholder='기수'
            value={selectedGenLabel}
            options={sortedGenerations.map((g) => `${g.generationId}기`)}
            onSelect={(label) => {
              const gen = label.replace('기', '');
              updateQuery('gen', gen);
            }}
          />
          <Dropdown
            placeholder='활동'
            value={selectedActLabel}
            options={activityLabels}
            onSelect={(label) => {
              const act = Object.keys(ACTIVITY_MAP).find(
                (key) => ACTIVITY_MAP[key] === label
              );
              if (act) updateQuery('act', act);
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
      {sortedGenerations.length === 0 ? (
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

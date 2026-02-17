'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {useCallback, useMemo} from 'react';
import {ProjectSection} from './ProjectSection';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {Button} from '@repo/ui/components/buttons/Button';
import {ROUTES} from '@/constants/routes';
import {ACTIVITY_MAP} from '@/constants/project/project-activity';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useAuthStore} from '@/store/useAuthStore';

export const ProjectContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {user} = useAuthStore();

  const genParam = searchParams.get('gen'); // null이면 전체
  const actParam = searchParams.get('act'); // null이면 전체
  const isAdmin = user?.isAdmin === true;

  const {data: generations = [], isLoading} = useGenerationQuery();

  const sortedGenerations = useMemo(() => {
    return [...generations].sort((a, b) => b.generationId - a.generationId);
  }, [generations]);

  const selectedGenLabel = genParam ? `${genParam}기` : '전체';
  const selectedActLabel = actParam ? ACTIVITY_MAP[actParam] || '전체' : '전체';
  const activityLabels = useMemo(() => {
    return ['전체', ...Object.values(ACTIVITY_MAP)];
  }, []);

  const genOptions = useMemo(() => {
    return ['전체', ...sortedGenerations.map((g) => `${g.generationId}기`)];
  }, [sortedGenerations]);

  const updateQuery = useCallback(
    (key: 'gen' | 'act', value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handleActSelect = useCallback(
    (label: string) => {
      if (label === '전체') {
        updateQuery('act', 'all');
        return;
      }

      const actKey = Object.keys(ACTIVITY_MAP).find(
        (key) => ACTIVITY_MAP[key] === label
      );

      if (actKey) {
        updateQuery('act', actKey);
      }
    },
    [updateQuery]
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
            options={genOptions}
            onSelect={(label) => {
              const gen = label === '전체' ? 'all' : label.replace('기', '');
              updateQuery('gen', gen);
            }}
          />
          <Dropdown
            placeholder='활동'
            value={selectedActLabel}
            options={activityLabels}
            onSelect={handleActSelect}
          />
        </div>
        {isAdmin && (
          <Button
            label='추가하기'
            labelTypo='body_l'
            width={127}
            height={40}
            onClick={() => router.push(ROUTES.ADD_PROJECT())}
          />
        )}
      </div>
      <ProjectSection
        generation={genParam ?? undefined}
        activity={actParam ?? undefined}
      />
    </section>
  );
};

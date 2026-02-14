'use client';

import {HomeCotatoReviewCard} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCotatoReviewCard';
import {HomeSectionDescription} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionDescription';
import {motion, useAnimationControls} from 'framer-motion';
import {useCallback, useEffect, useState} from 'react';

const ITEMS_PER_PAGE = 3;

export const HomeCotatoReviewContainer = () => {
  const controls = useAnimationControls();
  const [displayIndex, setDisplayIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const cardWidth = 339;
  const gap = 20;
  const moveDistance = cardWidth * ITEMS_PER_PAGE + gap * ITEMS_PER_PAGE;

  const totalPages = Math.ceil(COTATO_REVIEWS_DATA.length / ITEMS_PER_PAGE);

  const extendedReviews = [
    ...COTATO_REVIEWS_DATA.slice(-ITEMS_PER_PAGE),
    ...COTATO_REVIEWS_DATA,
    ...COTATO_REVIEWS_DATA.slice(0, ITEMS_PER_PAGE),
  ];

  const animateTo = useCallback(
    async (targetIndex: number) => {
      setIsTransitioning(true);
      setDisplayIndex(targetIndex);

      await controls.start({
        x: -targetIndex * moveDistance,
        transition: {duration: 0.8, ease: [0.4, 0, 0.2, 1]},
      });

      if (targetIndex > totalPages) {
        controls.set({x: -1 * moveDistance});
        setDisplayIndex(1);
      } else if (targetIndex < 1) {
        controls.set({x: -totalPages * moveDistance});
        setDisplayIndex(totalPages);
      }

      setIsTransitioning(false);
    },
    [controls, moveDistance, totalPages]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    animateTo(displayIndex + 1);
  }, [animateTo, displayIndex, isTransitioning]);

  const handleDotClick = (index: number) => {
    if (isTransitioning || (displayIndex - 1) % totalPages === index) return;
    animateTo(index + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <div className='flex flex-col gap-10 py-10'>
      <HomeSectionDescription
        title='찐감자들의 후기'
        descriptions={[
          '코테이토에는 기획, 디자인, 프론트엔드와 백엔드 개발 총 4개의 파트가 있어요.',
          '여러 감자들과 함께 스터디와 프로젝트를 진행하며 성장할 수 있어요.',
          '열정만 있다면 누구나 멋진 회오리 감자로 변신 가능!',
        ]}
        align='end'
      />

      <div
        className='relative mx-auto overflow-hidden'
        style={{width: `${cardWidth * 3 + gap * 2}px`}}>
        <motion.div
          className='flex'
          style={{gap: `${gap}px`}}
          initial={{x: -moveDistance}}
          animate={controls}>
          {extendedReviews.map((review, idx) => (
            <div key={`${review.id}-${idx}`} className='shrink-0'>
              <HomeCotatoReviewCard {...review} />
            </div>
          ))}
        </motion.div>
      </div>

      <div
        className='flex justify-center gap-3'
        role='tablist'
        aria-label='리뷰 페이지 선택'>
        {Array.from({length: totalPages}).map((_, index) => {
          const isActive = (displayIndex - 1) % totalPages === index;
          return (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              role='tab'
              aria-selected={isActive}
              aria-label={`${index + 1}번 리뷰 그룹 보기`}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-neutral-600'
                  : 'bg-neutral-200 hover:bg-neutral-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

/**
 * 리뷰 데이터 12개 고정
 * 프론트에서 관리
 */
const COTATO_REVIEWS_DATA = [
  {
    id: 5,
    generation: '9 ~ 11',
    part: '백엔드',
    name: '윤찬호',
    shortDescription: '좋은 동료들과 함께 성장할 수 있는 기회',
    longDescription:
      '처음에 많이 부족한 상태로 동아리에 들어왔던 것 같습니다 하지만 좋은 동료들과 함께 네트워킹과 CS 교육을 하며 기본기를 쌓을 수 있었고, 자유로운 스터디를 통해 깊이 있게 배울 수 있었습니다. 돌이켜보면 가장 빠르게 성장했던, 값진 시간이었습니다.',
  },
  {
    id: 1,
    generation: '10 ~ 11',
    part: '기획',
    name: '이채은',
    shortDescription: '아이디어가 현실이 되는 시간',
    longDescription:
      '생각하던 기획을 팀원들과 실제로 구현하며 PM으로서 소프트 스킬과 직무 역량을 키울 수 있었습니다. 또한 스터디와 기획 발표를 통해 IT 트렌드에 대한 감각도 꾸준히 유지할 수 있었습니다.',
  },
  {
    id: 8,
    generation: '12',
    part: '백엔드',
    name: '박현정',
    shortDescription: '개발자로서 성장할 수 있는 기회',
    longDescription:
      '스터디, 네트워킹 과제, 팀프로젝트를 하면서 백엔드 개발자로서의 역량을 키우고 성장할 수 있는 소중한 기회였습니다! 열심히 하는 만큼 많이 얻어가는 것 같아요 코테이토 최고🥔🤎',
  },
  {
    id: 3,
    generation: '9 ~ 11',
    part: '디자인',
    name: '노현아',
    shortDescription: '따뜻한 팀워크 속에서 성장한 시간',
    longDescription:
      '개발자들과 처음으로 협업할 수 있었던 의미있는 경험이었습니다. 이전에는 감각에 의존해 디자인했다면, 코테이토를 통해 개발자와의 원활한 소통을 고려한 디자인을 배울 수 있었습니다. 무엇보다 열정적인 팀원들과 따뜻하고 즐거운 분위기 속에서 활동할 수 있었던 점이 가장 인상 깊었습니다. ',
  },
  {
    id: 11,
    generation: '12',
    part: '기획',
    name: '장수빈',
    shortDescription: '도망가지 않는 개발자와 끝까지 함께하는 팀',
    longDescription:
      '  코테이토의 가장 큰 장점은 책임감 있는 동료입니다. 프로젝트, 스터디, 해커톤까지 모든 활동에서 열정적인 팀원들과 함께했습니다. 특히 체계적인 커리큘럼과 OM들의 진심 어린 멘토링 덕분에 성공적으로 서비스를 구현했습니다. 내 기획을 끝까지 실현해 줄 든든한 러닝메이트가 필요하다면 강력 추천합니다.',
  },
  {
    id: 6,
    generation: '10 ~ 11',
    part: '백엔드',
    name: '신윤섭',
    shortDescription: '진짜 프로젝트 경험을 원한다면',
    longDescription:
      'API 작성도 어려워하고 프로젝트 경험도 부족했던 제가 스터디와 프로젝트를 통해 코드 실력은 물론 파트간 협업을 경험하며 성장할 수 있었습니다. 다른 건 몰라도 프로젝트는 꼭 참여하세요! 그리고 서로 다른 학교, 학과에서 모인 사람들과 이야기하며 개발자로서 새로운 시야를 얻을 수 있었어요!',
  },
  {
    id: 10,
    generation: '10 ~ 11',
    part: '프론트엔드',
    name: '전시원',
    shortDescription: '사람과 실력을 함께 얻은 경험',
    longDescription:
      '매주 진행되는 CS 세션을 통해 기본기를 탄탄히 다질 수 있었고, 함께 성장하며 프로젝트를 완성해 나가는 과정 속에서 실력과 더불어 오래 함께할 소중한 인연까지 얻을 수 있었던 값진 경험이었습니다.',
  },
  {
    id: 2,
    generation: '8 ~ 10',
    part: '기획',
    name: '전민재',
    shortDescription: '기초부터 배워나갈 수 있는 환경',
    longDescription:
      '코테이토는 기획자로서 처음부터 프로젝트를 만들어볼 수 있었던 값진 경험이었습니다. 아이디어를 직접 구체화하고 팀원들과 계속 이야기하며 방향을 잡아가는 과정이 쉽지는 않았지만, 새롭게 배우고자 하는 의지가 큰 부원들과 함께 프로젝트를 진행하며, 서로 자극을 주고받는 과정 속에서 더 빠르게 성장할 수 있었습니다.',
  },
  {
    id: 12,
    generation: '12',
    part: '프론트엔드',
    name: '김법균',
    shortDescription: '같은 목표를 가진 사람들과의 성장',
    longDescription:
      '코테이토에서 같은 목표를 가진 부원들과 스터디를 진행하며 혼자보다 더 효과적으로 배울 수 있었습니다. 또한 프로젝트를 통해 다양한 파트 팀원들과 협업하며 시야를 넓힐 수 있었습니다. 성장에 대한 열정이 있다면 꼭 추천하고 싶습니다!',
  },
  {
    id: 7,
    generation: '6 ~ 9',
    part: '백엔드',
    name: '신유승',
    shortDescription: '대학생활 마지막 낭만',
    longDescription:
      '아무것도 모르던 내가 성장에 대한 열망 하나로 시작해 개발, 프로젝트, 동아리 운영까지 뜻이 맞는 사람들과 함께 성장하고 추억을 만들며 그 끝에 꿈을 이룬 내 대학생활 마지막 낭만',
  },
  {
    id: 9,
    generation: '8 ~ 11',
    part: '프론트엔드',
    name: '조원영',
    shortDescription: '개발의 시작부터 프로젝트 완성까지',
    longDescription:
      '코테이토에서 개발을 처음 시작해 스터디와 프로젝트를 거치며 정말 큰 성장을 이룰 수 있었습니다. 같은 목표를 가진 부원들과 소통하면서 배운 점도 많았습니다. 성장에 대한 열망이 가득한 분들이라면 주저하지 말고 지원하시길 적극 추천합니다!.',
  },
  {
    id: 4,
    generation: '11 ~ 12',
    part: '디자인',
    name: '최예진',
    shortDescription: '단기간에 성장할 수 있는 활동',
    longDescription:
      '실무 프로세스를 압축적으로 경험해본 것이 합격에 큰 도움이 되었다고 생각합니다. 특히 스터디로 기초를 다진 후 프로덕트를 제작해보며 차근차근 배워나갈 수 있었던 점이 좋았습니다. 또한 네트워킹을 통해 좋은 동료들과 서로 돕기도 하고, 고민도 나누며 많은 것을 얻어갈 수 있었습니다. ',
  },
];

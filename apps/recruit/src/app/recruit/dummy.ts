import {
  ActivityCardType,
  PositionCardType,
  TimelineType,
} from '@/schemas/recruit/recruit.schema';

export const TimelineDummy: TimelineType[] = [
  {title: 'test1test1test1', date: '2026.01.01'},
  {title: 'test2', date: '2026.01.022026.01.02'},
  {title: 'test\n3', date: '2026.01.03\n2026.01.03\n2026.01.03'},
  {title: 'test4', date: '2026.01.04'},
  {title: 'test5', date: '2026.01.05'},
  {title: 'test6', date: '2026.01.06'},
];

export const PositionCardsDummy: PositionCardType[] = [
  {
    short: 'PM',
    name: 'string',
    detail: 'string',
  },
  {
    short: 'DE',
    name: 'string',
    detail: 'string',
  },
  {
    short: 'FE',
    name: 'string',
    detail: 'string',
  },
  {
    short: 'BE',
    name: 'string',
    detail: 'string',
  },
];

export const ActivityCardsDummy: ActivityCardType[] = [
  {
    id: 0,
    short: 'OT',
    name: 'string',
    date: 'string',
  },
  {
    id: 1,
    short: 'SESSION',
    name: 'string',
    date: 'string',
  },
  {
    id: 2,
    short: 'MT',
    name: 'string',
    date: 'string',
  },
  {
    id: 3,
    short: 'DEVTALK',
    name: 'string',
    date: 'string',
  },
  {
    id: 4,
    short: 'COKERTHON',
    name: 'string',
    date: 'string',
  },
  {
    id: 5,
    short: 'DEMODAY',
    name: 'string',
    date: 'string',
  },
];

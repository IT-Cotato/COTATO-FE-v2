import clsx from 'clsx';
import {Button} from './Button';

export const FullButton = (
  props: Omit<Parameters<typeof Button>[0], 'defaultWidth' | 'enableHover'>
) => {
  return (
    <Button
      {...props}
      defaultWidth='100%'
      enableHover={false}
      subLabelSpacing={14}
      wrapperClassName={clsx('w-full', props.wrapperClassName)}
    />
  );
};

import React, { FC } from 'react';
import { CustomTimelineAction, CusTomTimelineRow } from './mock';

export const CustomRender2: FC<{ action: CustomTimelineAction; row: CusTomTimelineRow }> = ({ action, row }) => {
  return (
    <div className={'effect'}>
      <div className={`effect-text`}>{`動画: ${action.data.name}`}</div>
    </div>
  );
};

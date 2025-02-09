import React from 'react';

export const CustomRender2= ({ action, row }) => {
  return (
    <div className={'effect'}>
      <div className={`effect-text`}>{`動画: ${action.data.name}`}</div>
    </div>
  );
};

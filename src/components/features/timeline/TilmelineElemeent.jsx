import React from 'react';

export const CustomRender= ({ action, row }) => {
  return (
    <div className={'copy'}>
      <div className={`copy-text`}>{`動画: ${action.data.name}`}</div>
    </div>
  );
};

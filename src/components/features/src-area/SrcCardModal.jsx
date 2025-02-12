import React, { useState } from 'react';
import { Button, Modal, Slider } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import MyButton from "@common/button";

const useStyle = createStyles(({ token }) => ({
  'my-modal-body': {
    background: token.blue1,
    padding: token.paddingSM,
  },
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-modal-header': {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
  },
  'my-modal-content': {
    border: '1px solid #333',
  },
}));

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const SrcCardModal = ({ videoSrc }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState([0, 100]); // 初期値: [開始, 終了]
  const { styles } = useStyle();
  const token = useTheme();

  const classNames = {
    body: styles['my-modal-body'],
    mask: styles['my-modal-mask'],
    header: styles['my-modal-header'],
    footer: styles['my-modal-footer'],
    content: styles['my-modal-content'],
  };

  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      boxShadow: 'inset 0 0 5px #999',
      borderRadius: 5,
    },
    mask: {
      backdropFilter: 'blur(10px)',
    },
    footer: {
      borderTop: '1px solid #333',
    },
    content: {
      boxShadow: '0 0 30px #999',
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MyButton className="bg-zinc-500 text-white" onClick={showModal}>
        タイムラインに追加
      </MyButton>
      <Modal
        title={<span className={styles.title}>動画の区間選択</span>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        classNames={classNames}
        styles={modalStyles}
      >
        <div className={styles.container}>
          {/* プレビューエリア */}
          <div className={styles.videoContainer}>
            <video src={videoSrc} controls width="45%" preload="metadata" className={styles.border} />
            <video src={videoSrc} controls width="45%" preload="metadata" className={styles.border} />
          </div>

          {/* スライダー */}
          <div className={styles.sliderContainer}>
            <Slider
              range
              min={0}
              max={100}
              step={1}
              value={values}
              onChange={(newValues) => setValues(newValues)}
              tipFormatter={(value) => formatTime(value)}
              trackStyle={[{ backgroundColor: '#4f46e5' }]}
              handleStyle={[{ borderColor: '#4f46e5', backgroundColor: '#4f46e5' }, { borderColor: '#4f46e5', backgroundColor: '#4f46e5' }]}
              railStyle={{ backgroundColor: '#555' }}
            />
          </div>
          <div className="mt-2">開始: {formatTime(values[0])} | 終了: {formatTime(values[1])}</div>
        </div>
      </Modal>
    </>
  );
};

export default SrcCardModal;

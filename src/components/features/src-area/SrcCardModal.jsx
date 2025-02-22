import React, { useState, useRef } from 'react';
import { Modal, Slider, Radio } from 'antd';
import MyButton from "@common/button";
import "./modal.less";
import { useAtom } from 'jotai';
import { timelineAtom } from '@atoms/atom';
import CImenu from './CImenu';

const options = [
  { label: 'copy', value: 'copy' },
  { label: 'I-substitute', value: 'I-substitute' },
  { label: 'P-duplicate', value: 'P-duplicate' },
];

// const maxTime = (timeline) => {
//   const actions = timeline[0].actions;
//   let max = 0;
//   actions.forEach((action) => {
//     if (action.end > max) {
//       max = action.end;
//     }
//   });
//   return max;
// };

const SrcCardModal = ({ videoSrc, name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [radioValue, setRadioValue] = useState('copy');
  const isPduplicate = radioValue === 'P-duplicate';

  const showModal = () => setIsModalOpen(true);

  const handleOk = () => {
    // タイムラインへのアイテムの追加処理
    // const newTimelineItem = {
    //   id: Date.now(),
    //   start: maxTime(timelineData),
    //   end: maxTime(timelineData) + rangeValues[1] - rangeValues[0],
    //   effectId: radioValue, // 動画
    //   flexible: false,
    //   data: {
    //     src: videoSrc,
    //     name: name,
    //     cripStart: rangeValues[0],
    //     cripEnd: rangeValues[1],
    //   },
    // }
    // // console.log(newTimelineItem);
    // const newTimelineData = [{
    //   id: '1',
    //   actions: timelineData[0].actions.concat(newTimelineItem)
    // }]
    // setTimelineData(newTimelineData);
    setIsModalOpen(false);
  };

  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <MyButton className="bg-zinc-500" onClick={showModal}>
        タイムラインに追加
      </MyButton>
      <Modal
        title="タイムラインに追加する動画の区間を選択"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className='modal'
      >
        <div className="flex flex-col items-center w-full gap-4">
          {/* モード選択 */}
          <Radio.Group
            block
            options={options}
            defaultValue="copy"
            optionType="button"
            buttonStyle="solid"
            onChange={(e) => setRadioValue(e.target.value)}
          />
          {!isPduplicate && <CImenu videoSrc={videoSrc} name={name}/>}
        </div>
      </Modal>
    </>
  );
};

export default SrcCardModal;

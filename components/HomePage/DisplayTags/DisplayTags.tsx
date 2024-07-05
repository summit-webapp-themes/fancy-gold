import React from 'react';
import useDisplayTagHooks from '../../../hooks/HomePageHooks/DisplayTagHooks';
import SliderSection from './SliderSection';
import Image from 'next/image';
import lineImg from '../../../public/assets/images/Line-Design-blue.svg';

const DisplayTags = () => {
  const { allTagsData } = useDisplayTagHooks();
  console.log('allTagsData', allTagsData);
  const updateDisplayTagList: any = allTagsData?.length > 0 && allTagsData?.filter((items: any) => items.value?.length > 0);
  return (
    <>
      <div className="display-tags-section pb-5">
        <div className="container">
          {Array.isArray(updateDisplayTagList) && updateDisplayTagList?.length > 0 ? (
            updateDisplayTagList.map((tagsData: any, index: any) => {
              return (
                <>
                  <div className="text-center text-secondary">
                    <h2 className="pt-5 pb-2 heading-text">{tagsData.tag_name}</h2>
                    <Image src={lineImg} alt="img" style={{ width: '100%', height: '100%' }} height={200} className="py-4" />
                    <SliderSection data={tagsData} />
                  </div>
                </>
              );
            })
          ) : (
            <h6 className="text-center mt-5 text-danger">{allTagsData}</h6>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayTags;

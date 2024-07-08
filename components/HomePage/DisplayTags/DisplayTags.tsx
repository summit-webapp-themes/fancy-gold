import React from 'react';
import Image from 'next/image';
import useDisplayTagHooks from '../../../hooks/HomePageHooks/DisplayTagHooks';
import SliderSection from './SliderSection';
import lineImg from '../../../public/assets/images/Line-Design-blue.svg';

const DisplayTags = () => {
  const { allTagsData } = useDisplayTagHooks();
  const updateDisplayTagList: any = Array.isArray(allTagsData) && allTagsData?.length > 0 && allTagsData?.filter((items: any) => items.value?.length > 0);
  return (
    <>
      {Array.isArray(allTagsData) ? (
        <div className="display-tags-section pb-5">
          <div className="container">
            {updateDisplayTagList?.length > 0 && (
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
            )}
          </div>
        </div>
      ) : (
        <h6 className="text-center mt-5 text-danger">{allTagsData}</h6>
      )}
    </>
  );
};

export default DisplayTags;

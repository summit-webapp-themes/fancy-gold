import Image from 'next/image';
import { Skeleton } from '@mui/material';
import useDisplayTagHooks from '../../../hooks/HomePageHooks/DisplayTagHooks';
import lineImg from '../../../public/assets/images/Line-Design-blue.svg';
import ComponentErrorHandler from '../../ComponentErrorHandler';
import SliderSection from './SliderSection';

const DisplayTags = () => {
  const { allTagsData, isLoading, errorMessage } = useDisplayTagHooks();
  const updateDisplayTagList: any = Array.isArray(allTagsData) && allTagsData?.length > 0 && allTagsData?.filter((items: any) => items.value?.length > 0);

  const showDisplayTagSection: any = () => {
    if (isLoading) {
      const data = { value: [] };
      return (
        <>
          <div className="display-tags-section pb-5">
            <div className="container">
              <div className="d-flex justify-content-center my-3">
                <Skeleton width={320} height={50} animation="wave" />
              </div>
              <div className="d-flex justify-content-center my-4">
                <Skeleton width={1900} height={10} animation="wave" />
              </div>
              <SliderSection data={data} />
            </div>
          </div>
        </>
      );
    }

    if (updateDisplayTagList?.length > 0 && Array.isArray(allTagsData) && isLoading === false) {
      return (
        <div className="display-tags-section pb-5">
          <div className="container">
            {updateDisplayTagList?.length > 0 &&
              updateDisplayTagList?.map((tagsData: any, index: any) => {
                return (
                  <>
                    <div className="text-center text-secondary" key={index}>
                      <h2 className="pt-5 pb-2 heading-text">{tagsData.tag_name}</h2>
                      <Image src={lineImg} alt="img" style={{ width: '100%', height: '100%' }} height={200} className="py-4" />
                      <SliderSection data={tagsData} />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      );
    }

    if (errorMessage !== '' && allTagsData?.length === 0 && isLoading === false) {
      return <ComponentErrorHandler error={errorMessage} />;
    }
  };
  return <>{showDisplayTagSection()}</>;
};

export default DisplayTags;

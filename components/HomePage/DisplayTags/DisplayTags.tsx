import { Skeleton } from '@mui/material';
import Image from 'next/image';
import useDisplayTagHooks from '../../../hooks/HomePageHooks/DisplayTagHooks';
import lineImg from '../../../public/assets/images/Line-Design-blue.svg';
import ProductCardSkeleton from '../../Skeleton/ProductCardSkeleton';
import SliderSection from './SliderSection';

const DisplayTags = () => {
  const { allTagsData } = useDisplayTagHooks();
  const updateDisplayTagList: any = Array.isArray(allTagsData) && allTagsData?.length > 0 && allTagsData?.filter((items: any) => items.value?.length > 0);

  const showDisplayTagSection: any = () => {
    if (Array.isArray(allTagsData) && updateDisplayTagList?.length > 0) {
      return (
        <div className="display-tags-section pb-5">
          <div className="container">
            {updateDisplayTagList?.length > 0 &&
              updateDisplayTagList?.map((tagsData: any, index: any) => {
                return (
                  <>
                    <div className="text-center text-secondary">
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
    if (!Array.isArray(allTagsData)) {
      return <h6 className="text-center mt-5 text-danger">{allTagsData}</h6>;
    }
    if (allTagsData?.length === 0) {
      return (
        <>
          <div className="d-flex justify-content-center my-3">
            <Skeleton width={350} height={50} animation="wave" />
          </div>
          <div className="d-flex justify-content-center">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="col-lg-3 col-md-2 ">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        </>
      );
    }
  };
  return <>{showDisplayTagSection()}</>;
};

export default DisplayTags;

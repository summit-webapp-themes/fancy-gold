import Image from 'next/image';
import useDisplayTagHooks from '../../../hooks/HomePageHooks/DisplayTagHooks';
import lineImg from '../../../public/assets/images/Line-Design-blue.svg';
import ComponentErrorHandler from '../../ComponentErrorHandler';
import SliderSection from './SliderSection';
import displayTagStyles from '../../../styles/components/displayTags.module.scss';
import DisplayTagLoadingComponnet from './DisplayTagLoadingComponnet';

const DisplayTags = () => {
  const { allTagsData, isLoading, errorMessage } = useDisplayTagHooks();
  const updateDisplayTagList: any =
    Array.isArray(allTagsData) && allTagsData?.length > 0 && allTagsData?.filter((items: any) => items.value?.length > 0);

  const showDisplayTagSection: any = () => {
    if (isLoading) {
      return (
        <>
          <DisplayTagLoadingComponnet />
        </>
      );
    }

    if (updateDisplayTagList?.length > 0 && Array.isArray(allTagsData) && isLoading === false) {
      return (
        <div className="ps-lg-5 pe-lg-4 ">
          <div className="row m-0  display-tags-section">
            <div className="col-12 ">
              {updateDisplayTagList?.length > 0 &&
                updateDisplayTagList?.map((tagsData: any, index: any) => {
                  return (
                    <>
                      <div className="text-center text-secondary" key={index}>
                        <h2 className="pt-5 pb-2 heading-text">{tagsData.tag_name}</h2>

                        <Image
                          src={lineImg}
                          alt="img"
                          style={{ width: '100%', height: '100%' }}
                          height={200}
                          className={displayTagStyles.horizontal_wrapper}
                        />

                        <SliderSection data={tagsData} />
                      </div>
                    </>
                  );
                })}
            </div>
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

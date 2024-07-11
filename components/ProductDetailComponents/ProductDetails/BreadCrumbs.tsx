import Link from 'next/link';
import { Skeleton } from '@mui/material';
import UseBreadCrumbsHook from '../../../hooks/GeneralHooks/breadcrumbs-hook';
import ComponentErrorHandler from '../../ComponentErrorHandler';

const BreadCrumbs = () => {
  const { breadCrumbData, isLoading, errorMessage } = UseBreadCrumbsHook();

  let sub_sub_cat: String;
  breadCrumbData?.length > 0 &&
    breadCrumbData?.map((item: any) => {
      if (item?.name === null) {
        sub_sub_cat = item?.link?.split('/')[4];
        if (sub_sub_cat === undefined) {
          sub_sub_cat = item?.link?.split('/')[3];
        }
      }
    });
  const handleDataRendering = () => {
    if (!isLoading) {
      return <Skeleton variant="rounded" width={200} height={20} className="mt-2" animation={false} />;
    }
    if (breadCrumbData?.length > 0) {
      return (
        <section className="breadcrumb_section pt-2 ">
          <div className="container pt-0">
            <div className="row">
              <div className="col-lg-9">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/" legacyBehavior>
                        <a href="">
                          <i className="fa fa-home bredcrumb_home_icon" aria-hidden="true"></i>
                        </a>
                      </Link>
                    </li>
                    {breadCrumbData?.length > 0 &&
                      breadCrumbData?.map((item: any, index: number) => (
                        <>
                          <li key={index} className="breadcrumb-item active text-color-black" aria-current="page">
                            <Link href={`${item?.link}?page=1`} legacyBehavior className="text-color-black">
                              {item?.name === null && sub_sub_cat !== 'undefined' ? 'value is null' : item?.name}
                            </Link>
                          </li>
                        </>
                      ))}
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
      );
    }
    if (errorMessage !== '' && breadCrumbData?.length <= 0 && isLoading === false) {
      return (
        <div className="w-25">
          <ComponentErrorHandler error={errorMessage} />
        </div>
      );
    }
  };
  return <div>{handleDataRendering()}</div>;
};

export default BreadCrumbs;

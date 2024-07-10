import Link from 'next/link';
import UseBreadCrumbsHook from '../../../hooks/GeneralHooks/breadcrumbs-hook';

const BreadCrumbs = () => {
  const { breadCrumbData } = UseBreadCrumbsHook();

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
};

export default BreadCrumbs;

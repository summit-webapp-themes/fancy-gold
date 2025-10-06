import { useRef, useState } from 'react';
import Link from 'next/link';
import { Overlay, Placeholder, Popover } from 'react-bootstrap';
// import NavbarLoadingComponent from './NavbarLoadingComponent';
import ComponentErrorHandler from '../ComponentErrorHandler';
import NavbarLoadingComponent from './NavbarLoadingComponent';
import stylesHeader from '../../styles/components/header.module.scss';
import { useDispatch } from 'react-redux';
// import { AddReference } from '../../store/slices/reference-tracking-slices/reference-tracking-slice';

const HeaderCategories = ({ navbarData, isLoading, errorMessage }: any) => {
  const dispatch = useDispatch();
  const [showPopoverIndex, setShowPopoverIndex] = useState<number | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, index: number) => {
    setTarget(e.currentTarget);
    setShowPopoverIndex(index);
  };
  const handleMouseLeave = () => {
    setShowPopoverIndex(null);
  };
  const handleClickCategory = (slug: string) => {
    setShowPopoverIndex(null);
    // dispatch(
    //   AddReference({
    //     reference_page: 'Category',
    //     reference_id: slug,
    //   })
    // );
  };
  const popoverBottom = (item: any) => (
    <Popover id={`popover-${item.label}`} className={`p-2 ${stylesHeader.category_popover} shadow rounded`} onMouseLeave={handleMouseLeave}>
      <div className="row">
        {item?.values?.length > 0 &&
          item?.values !== null &&
          item?.values.map((itemL2: any, index: number) => {
            const columnCount = Math.ceil(itemL2?.values?.length / 8);
            return (
              <div className="col" key={index}>
                <div className={stylesHeader.heading_category_l2}>
                  <Link
                    href={{
                      pathname: `${itemL2?.url}`,
                      query: { page: '1', sort_by: 'creation', currency: 'INR' },
                    }}
                    className="label theme-blue text-decoration-none"
                    onClick={() => handleClickCategory(itemL2?.slug)}
                  >
                    {itemL2?.label}
                  </Link>
                </div>
                <hr className="m-1" />
                <div className={stylesHeader.col_container}>
                  {Array.from({ length: columnCount }, (_, columnIndex) => (
                    <div key={columnIndex} className={stylesHeader.column}>
                      {itemL2?.values?.slice(columnIndex * 8, (columnIndex + 1) * 8).map((itemL3: any, idx: number) => (
                        <div key={idx} className=" p-1">
                          <Link
                            href={{
                              pathname: `${itemL3?.url}`,
                              query: { page: '1', sort_by: 'creation', currency: 'INR' },
                            }}
                            className={stylesHeader.heading_category_l3}
                            onClick={() => handleClickCategory(itemL3?.slug)}
                          >
                            {itemL3?.label !== undefined ? itemL3?.label : `${idx}`}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </Popover>
  );
  const handleDataRendering = () => {
    if (isLoading) {
      return <NavbarLoadingComponent />;
    }
    if (navbarData?.length > 0) {
      const categoriesData = navbarData[0]?.values;
      return (
        <nav ref={ref}>
          <div className={`${stylesHeader.heading_container} py-2`} onMouseLeave={handleMouseLeave}>
            {categoriesData?.length > 0 &&
              categoriesData.map((item: any, index: number) => (
                <div key={index} className={`${stylesHeader.header_category_container}`}>
                  {categoriesData === null ? (
                    <Placeholder xs={6} bg="dark" />
                  ) : (
                    <div
                      className={`heading-category-l1 ${showPopoverIndex === index && 'theme-gold'}`}
                      onMouseEnter={(e) => handleMouseEnter(e, index)}
                    >
                      {item.label}
                    </div>
                  )}
                  <Overlay
                    show={showPopoverIndex === index && item?.values?.length > 0}
                    target={target}
                    placement="bottom"
                    container={ref.current}
                    containerPadding={20}
                  >
                    {popoverBottom(item)}
                  </Overlay>
                </div>
              ))}
          </div>
        </nav>
      );
    }
    if (errorMessage !== '' && navbarData?.length <= 0 && isLoading === false) {
      return <ComponentErrorHandler error={errorMessage} />;
    }
  };

  return <header>{handleDataRendering()}</header>;
};

export default HeaderCategories;

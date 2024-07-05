import { Skeleton } from '@mui/material';
import { useRef, useState } from 'react';
import { Overlay, Placeholder, Popover } from 'react-bootstrap';

const HeaderCategories = ({ navbarData, isLoading, errorMessage }: any) => {
  const [showPopoverIndex, setShowPopoverIndex] = useState<number | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  console.log(isLoading, navbarData, 'isLoading');
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, index: number) => {
    setTarget(e.currentTarget);
    setShowPopoverIndex(index);
  };

  const handleMouseLeave = () => {
    setShowPopoverIndex(null);
  };
  const popoverBottom = (item: any) => (
    <Popover id={`popover-${item.label}`} className="p-2 category-popover shadow rounded" onMouseLeave={handleMouseLeave}>
      <div className="row ">
        {item?.values?.length > 0 &&
          item?.values !== null &&
          item?.values.map((itemL2: any, index: number) => {
            const columnCount = Math.ceil(itemL2?.values?.length / 8);
            return (
              <div className="col">
                <div className="heading-category-l2">{itemL2?.label}</div>
                <hr className="m-1" />
                <div className=" col-container">
                  {Array.from({ length: columnCount }, (_, columnIndex) => (
                    <div key={columnIndex} className="column">
                      {itemL2?.values?.slice(columnIndex * 8, (columnIndex + 1) * 8).map((itemL3: any, idx: number) => (
                        <div key={idx} className="heading-category-l3 p-1">
                          {itemL3?.label !== undefined ? itemL3?.label : `${idx}`}
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
  return (
    <header className="">
      <nav ref={ref}>
        {!isLoading ? (
          <div className='d-flex justify-content-center py-2 overflow-hidden'>
            {[1,2,3,4,5,6,7,8].map((_,index) =><Skeleton sx={{ bgcolor: '#cfcfcf' }} variant="rectangular" width={90} height={18} className='mx-3' animation={false}/>)}
                
          </div>
        ) : (
          <div className="heading-container py-2" onMouseLeave={handleMouseLeave}>
            {navbarData?.length > 0 &&
              navbarData.map((item: any, index: number) => (
                <div key={index} className="header-category-container">
                  {navbarData === null ? (
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
        )}
      </nav>
    </header>
  );
};

export default HeaderCategories;

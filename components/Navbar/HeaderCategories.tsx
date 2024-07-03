import { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';

const HeaderCategories = ({ navbarData }: any) => {
  const [showPopoverIndex, setShowPopoverIndex] = useState<number | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setTarget(e.currentTarget);
    setShowPopoverIndex(index);
  };

  const handleMouseLeave = () => {
    setShowPopoverIndex(null);
  };
  const popoverBottom = (item: any) => (
    <Popover
      id={`popover-${item.label}`}
      title="Popover bottom"
      className="p-2 category-popover "
      onMouseLeave={handleMouseLeave}
    >
      <div className="row">
        {item?.values?.length > 0 &&
          item?.values !== null &&
          item?.values.map((itemL2: any, index: number) => (
            <div className="col">
              <div className="heading-category-l2">{itemL2?.label}</div>
              <hr />
              {itemL2?.values?.length > 0 &&
                itemL2?.values !== null &&
                itemL2?.values?.map((itemL3: any) => (
                  <div className="heading-category-l3">{itemL3.label}</div>
                ))}
            </div>
          ))}
      </div>
    </Popover>
  );
  return (
    <nav ref={ref}>
      <div className="heading-container" onMouseLeave={handleMouseLeave}>
        {navbarData !== null &&
          navbarData?.length > 0 &&
          navbarData.map((item: any, index: number) => (
            <div key={index}>
              <div
                className="heading-category-l1"
                onMouseEnter={(e) => handleMouseEnter(e, index)}
              >
                {item.label}
              </div>
              <Overlay
                show={showPopoverIndex === index}
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
};

export default HeaderCategories;

import { useEffect, useRef, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
// import '../../assets/css/image-slideshow.css';
import { CONSTANTS } from '../../../services/config/app-config';

const ProductImage = ({ Imageslideshow }: any) => {
  const { API_BASE_URL } = CONSTANTS;
  const [img, setImg] = useState('');

  const hoverHandler = (image: string, i: number) => {
    setImg(image);
    refs.current[i].classList.add('active');
    for (let j = 0; j < Imageslideshow?.length; j++) {
      if (i !== j) {
        refs.current[j].classList.remove('active');
      }
    }
  };

  // Refs to track active thumbnails
  const refs: any = useRef([]);
  refs.current = [];
  const addRefs = (el: any) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
  useEffect(() => {
    if (Imageslideshow?.length > 0) {
      setImg(Imageslideshow[0]);
    }
  }, [Imageslideshow]);
  const imageWidth = 400;
  const aspectRatio = 1.3; // width/height ratio of your image
  const imageHeight = imageWidth / aspectRatio;
  return (
    <div className="img-container">
      <div className="left">
        <div className="left_1">
          {/* Thumbnail Images */}
          {Imageslideshow?.map((image: string, i: number) => (
            <div className="img_wrap" key={i} onClick={() => hoverHandler(image, i)} ref={addRefs}>
              <img src={API_BASE_URL + image} alt={`Thumbnail ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* Main Magnified Image */}
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: 'Product image',
              isFluidWidth: false,
              width: imageWidth,
              height: imageHeight,
              src: API_BASE_URL + img,
            },
            largeImage: {
              src: API_BASE_URL + img,
              width: 1600,
              height: 1600,
            },
            enlargedImageClassName: 'magnified-image',
          }}
        />
      </div>
    </div>
  );
};

export default ProductImage;

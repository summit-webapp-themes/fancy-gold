import { useEffect, useRef, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import '../../assets/css/image-slideshow.css';
import { CONSTANTS } from '../../../services/config/app-config';
// import { DEFAULT_API_CONFIG } from '../../services/config/api-config';

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
    setImg(Imageslideshow[0]);
  }, [Imageslideshow]);
  return (
    <div className="img-container">
      <div className="left">
        <div className="left_1">
          {/* Thumbnail Images */}
          {Imageslideshow.map((image: string, i: number) => (
            <div className="img_wrap" key={i} onClick={() => hoverHandler(image, i)} ref={addRefs}>
              <img src={API_BASE_URL + image} alt={`Thumbnail ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* Main Magnified Image */}
        <div className="left_2">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'Product image',
                isFluidWidth: false,
                width: 400,
                height: 400,
                src: API_BASE_URL + img,
              },
              largeImage: {
                src: API_BASE_URL + img,
                width: 1200,
                height: 1200,
              },

              enlargedImageClassName: 'magnified-image',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;

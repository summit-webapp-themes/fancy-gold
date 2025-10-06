import { FaAngleRight } from 'react-icons/fa6';
import sliderSectionStyles from '../../../styles/components/sliderSection.module.scss';

const SliderNextArrow = ({ onClick }: any) => {
  return <FaAngleRight onClick={onClick} className={`${sliderSectionStyles.slider_arrow_right}`} />;
};

export default SliderNextArrow;

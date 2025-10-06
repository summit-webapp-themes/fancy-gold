import { FaAngleLeft } from 'react-icons/fa6';
import sliderSectionStyles from '../../../styles/components/sliderSection.module.scss';

const SliderPrevArrow = ({ onClick }: any) => {
  return <FaAngleLeft onClick={onClick} className={`${sliderSectionStyles.slider_arrow_left}`} />;
};

export default SliderPrevArrow;

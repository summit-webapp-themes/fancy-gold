import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SliderPrevArrow = ({ onClick }: any) => {
  return (
    <ArrowBackIosIcon
      onClick={onClick}
      
      className="slider-arrow-left"
    />
  );
};

export default SliderPrevArrow;

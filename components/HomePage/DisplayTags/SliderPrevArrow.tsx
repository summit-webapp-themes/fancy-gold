import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SliderPrevArrow = ({ onClick }: any) => {
  return (
    <ArrowBackIosIcon
      onClick={onClick}
      style={{ position: 'absolute', top: '50%', left: '-40px', cursor: 'pointer' }}
      sx={{ fontSize: '40px' }}
      className="slider-arrow"
    />
  );
};

export default SliderPrevArrow;

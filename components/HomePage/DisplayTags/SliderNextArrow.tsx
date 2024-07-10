import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SliderNextArrow = ({ onClick }: any) => {
  return (
    <ArrowForwardIosIcon
      onClick={onClick}
      sx={{ fontSize: '40px' }}
      style={{ position: 'absolute', top: '50%', right: '-40px', cursor: 'pointer' }}
      className="slider-arrow"
    />
  );
};

export default SliderNextArrow;

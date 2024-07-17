import Purity from './Purity';
import SortBy from './SortBy';

const HorizontalFilter = () => {
  return (
    <nav className="my-4">
      <div className="container">
        <div className="d-flex justify-content-center">
          <Purity />
          <SortBy />
        </div>
      </div>
    </nav>
  );
};

export default HorizontalFilter;

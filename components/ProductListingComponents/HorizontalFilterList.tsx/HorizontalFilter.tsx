import CustomerName from './CustomerName';
import Purity from './Purity';
import SortBy from './SortBy';

const HorizontalFilter = ({ sortBy, handleSortBy }: any) => {
  return (
    <nav className="my-3">
      <div className="container-xl">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="my-1">
            <CustomerName />
          </div>
          <div className="my-1">
            <Purity />
          </div>
          <div className="my-1">
            <SortBy sortBy={sortBy} handleSortBy={handleSortBy} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalFilter;

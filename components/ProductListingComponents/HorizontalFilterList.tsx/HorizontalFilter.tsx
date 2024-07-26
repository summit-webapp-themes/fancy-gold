import CustomerName from './CustomerName';
import Purity from './Purity';
import SortBy from './SortBy';

const HorizontalFilter = ({ sortBy, handleSortBy }: any) => {
  return (
    <nav className="my-4">
      <div className="container-xl">
        <div className="row">
          <div className="col-3">
            <CustomerName />
          </div>
          <div className="col-5">
            <Purity />
          </div>
          <div className="col-4">
            <SortBy sortBy={sortBy} handleSortBy={handleSortBy} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalFilter;

import CustomerName from './CustomerName';
import Purity from './Purity';
import SortBy from './SortBy';

const HorizontalFilter = ({ sortBy, handleSortBy }: any) => {
  return (
    <nav className="my-3">
      <div className="container-xl">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-4 col-lg-3 my-1">
            <CustomerName />
          </div>
          <div className="col-lg-5 col-sm-8 col-12 my-1">
            <Purity />
          </div>
          <div className="col-lg-4 my-1">
            <SortBy sortBy={sortBy} handleSortBy={handleSortBy} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HorizontalFilter;

import CustomerName from './CustomerName';
import Purity from './Purity';
import SortBy from './SortBy';

const HorizontalFilter = ({ sortBy, handleSortBy }: any) => {
  return (
    <nav className="my-4">
      <div className="container-xl">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-6 col-lg-3 my-1">
            <CustomerName />
          </div>
          <div className="col-lg-5 col-sm-8 col-8 my-1">
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

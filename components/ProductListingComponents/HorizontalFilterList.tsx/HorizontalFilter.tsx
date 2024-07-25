import CustomerName from './CustomerName';
import Purity from './Purity';
import SortBy from './SortBy';

const HorizontalFilter = ({ sortBy, handleSortBy }: any) => {
  return (
    <nav className="my-4">
      <div className="container">
        <div className="d-flex justify-content-center">
          <CustomerName/>
          <Purity />
          <SortBy sortBy={sortBy} handleSortBy={handleSortBy} />
        </div>
      </div>
    </nav>
  );
};

export default HorizontalFilter;

import useProductListingFilterHook from '../../../hooks/product-listing-hooks/product-listing-filter-hook';
import ComponentErrorHandler from '../../ComponentErrorHandler';
import FilterViewLoadingComponent from './FilterViewLoadingComponent';

const WebFilters = () => {
  const { filtersData, isLoading, errorMessage, handleFilterCheckFun, selectedFilters } = useProductListingFilterHook();

  const showFilterSection: any = () => {
    if (isLoading) {
      return <FilterViewLoadingComponent />;
    }

    if (Object.keys(filtersData)?.length > 0) {
      return (
        <div>
          <h4>Filters</h4>
          {filtersData?.filters?.length > 0 &&
            filtersData?.filters.map((data: any, index: any) => (
              <>
                <div key={index}>
                  <h6 className="mt-4 text-uppercase">{data.section}</h6>
                  <hr className="my-1" />
                  {data.values?.length > 0 &&
                    data.values.map((items: any) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={items}
                          name={data.section}
                          id={data.section}
                          onChange={handleFilterCheckFun}
                          checked={
                            Object.values(selectedFilters)?.length > 0 &&
                            Object.values(selectedFilters).some((selectedFilter: any) => selectedFilter.includes(items))
                          }
                        />
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                          {items}
                        </label>
                      </div>
                    ))}
                </div>
              </>
            ))}
        </div>
      );
    }
    if (errorMessage && isLoading === false) {
      return <ComponentErrorHandler error={errorMessage} />;
    }
  };
  return <>{showFilterSection()}</>;
};

export default WebFilters;

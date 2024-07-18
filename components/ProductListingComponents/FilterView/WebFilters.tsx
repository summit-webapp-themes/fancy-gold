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
        <div className="vh-100">
          <h5>Filters</h5>
          {filtersData?.filters?.length > 0 &&
            filtersData?.filters.map((data: any, index: any) => (
              <>
              {data.section!=='Purity' && 
                <div key={index}>
                  <div className="mt-4 text-uppercase" style={{fontSize:'14px'}}>{data.section}</div>
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
                            selectedFilters?.length > 0 && selectedFilters.some((filter: any) => filter.name === data.section && filter.value.includes(items))
                          }
                        />
                        <label className="form-check-label"style={{fontSize:'12px'}} htmlFor="flexCheckChecked">
                          {items}
                        </label>
                      </div>
                    ))}
                </div>
              }
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

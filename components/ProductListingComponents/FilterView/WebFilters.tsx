import useProductListingFilterHook from '../../../hooks/product-listing-hooks/product-listing-filter-hook';
import FilterViewLoadingComponent from './FilterViewLoadingComponent';

const WebFilters = ({ hideFilterSection, setHideFilterSection }: any) => {
  const { filtersData, isLoading, errorMessage, handleFilterCheckFun, selectedFilters } = useProductListingFilterHook();

  const showFilterSection: any = () => {
    if (isLoading) {
      return <FilterViewLoadingComponent />;
    }

    if (Object.keys(filtersData)?.length > 0) {
      setHideFilterSection(false);

      return (
        <>
          {!hideFilterSection && (
            <div className="vh-100 p-3" id="sidebar">
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
                                selectedFilters?.length > 0 &&
                                selectedFilters.some((filter: any) => filter.name === data.section && filter.value.includes(items))
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
          )}
        </>
      );
    }

    if (errorMessage && !isLoading) {
      setHideFilterSection(true);
    }
  };
  return <>{showFilterSection()}</>;
};

export default WebFilters;

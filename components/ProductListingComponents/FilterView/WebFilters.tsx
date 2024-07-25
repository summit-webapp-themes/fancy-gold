import { FaAlignJustify } from 'react-icons/fa6';
import useProductListingFilterHook from '../../../hooks/ProductListPageHooks/useProductListFilterHook';
import FilterViewLoadingComponent from './FilterViewLoadingComponent';
import filterStyles from '../../../styles/components/filterSidebar.module.scss';
const WebFilters = ({ hideFilterSection, setHideFilterSection, searchFilterValue, handleFilterSearchFun, handleFilterSearchBtn }: any) => {
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
            <div className="h-100 p-3" id={`${filterStyles.sidebar}`}>
              <h4>Filters</h4>
              <div className="input-group input-group-sm mt-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search here"
                  name="search"
                  id="search"
                  autoComplete="off"
                  value={searchFilterValue}
                  onChange={handleFilterSearchFun}
                />
                <span className="input-group-text" id="inputGroup-sizing-sm" onClick={handleFilterSearchBtn}>
                  <FaAlignJustify />
                </span>
              </div>
              {filtersData?.filters?.length > 0 &&
                filtersData?.filters.map((data: any, index: any) => (
                  <>
                    {data.section !== 'Purity' && (
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
                    )}
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

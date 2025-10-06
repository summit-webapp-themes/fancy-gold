import Select from 'react-select';


function OrderFilters({ data, handleFilterChange, purity }: any) {
  return (
    <div className="row">
      {data?.length > 0 &&
        data?.map((filter: any, index: number) => {
          const options =
            filter.options
              ?.filter((option: any) => option)
              .map((option: any) => ({
                value: option,
                label: option,
              })) || [];

          const defaultOption = filter.key === 'purity' ? options?.find((opt: any) => opt.value === purity) : null;

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-2" key={index}>
              <div>
                <label htmlFor={filter?.label} className="fw-bold">
                  {filter?.label}
                </label>
              </div>
              <div>
                <Select
                  options={options}
                  defaultValue={defaultOption}
                  onChange={(selectedOption: any) => handleFilterChange(filter?.key, selectedOption?.value)}
                  isClearable
                  isSearchable
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default OrderFilters;

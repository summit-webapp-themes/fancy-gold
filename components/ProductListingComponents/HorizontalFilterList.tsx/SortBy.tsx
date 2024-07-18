
const SortBy = ({ sortBy, handleSortBy }: any) => {
  return (
    <>
      <div className="d-flex justify-content-center flex-wrap">
        <select className="form-select form-select sort-by-select ">
          <option value="1" selected>
            Yellow
          </option>
          <option value="2">Rose</option>
          <option value="3">White</option>
        </select>
        <select className="form-select form-select sort-by-select " value={sortBy} onChange={(e) => handleSortBy(e.target.value)}>
          <option value="latest" selected>
            Latest Produts
          </option>
          <option value="oldest">Oldest Products</option>
          <option value="sequence">Sequence</option>
          <option value="weight_range">Weight Range</option>
        </select>
      </div>
    </>
  );
};

export default SortBy;

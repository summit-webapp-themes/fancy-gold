const SortBy = () => {
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
        <select className="form-select form-select sort-by-select ">
          <option value="1" selected>
            Latest Produts
          </option>
          <option value="2">Oldest Products</option>
          <option value="3">Sequence</option>
          <option value="4">Weight Range</option>
        </select>
      </div>
    </>
  );
};

export default SortBy;

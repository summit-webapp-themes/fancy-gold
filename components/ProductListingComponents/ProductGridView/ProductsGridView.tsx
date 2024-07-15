import ReactPaginate from "react-paginate";
import ProductCard from '../../../cards/ProductCard';

const ProductsGridView = ({ productListingData,handlePaginationBtn }: any) => {
  return (
    <div className="row justify-content-start">
      {productListingData.map((item: any, index: any) => (
        <div key={index}className='col-lg-3 mb-2'>
          <ProductCard data={item} />
        </div>
      ))}
      <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={"next"}
            pageCount={productListingData?.length}
            pageRangeDisplayed={3}
            onPageChange={handlePaginationBtn}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            disabledClassName={"paginationDisabled"}
            nextLinkClassName={
               "nextBttn"
            }
            activeClassName={"paginationActive"}
            // forcePage={pageOffset}
          />
    </div>
  );
};

export default ProductsGridView;

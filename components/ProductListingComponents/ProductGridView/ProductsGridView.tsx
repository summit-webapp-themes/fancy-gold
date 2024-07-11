import ProductCard from '../../../cards/ProductCard';

const ProductsGridView = ({ productListingData }: any) => {
  return (
    <div className="row justify-content-start">
      {productListingData.map((item: any, index: any) => (
        <div className='col-lg-3 mb-2'>
          <ProductCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default ProductsGridView;

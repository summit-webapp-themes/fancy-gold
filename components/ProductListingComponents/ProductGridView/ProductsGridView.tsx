import ProductCard from '../../../cards/ProductCard';

const ProductsGridView = ({ productListingData }: any) => {
  return (
    <div className="row justify-content-start">
      {productListingData.map((item: any, index: any) => (
        <div key={index} className="col-xl-3 col-lg-4 col-md-4 mb-2">
          <ProductCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default ProductsGridView;

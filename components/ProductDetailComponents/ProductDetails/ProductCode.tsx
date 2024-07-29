import React from 'react'

const ProductCode = ({data}:any) => {
  return (
    <p><b>Product Code</b> : {data?.name}
        <br />
      <b>Gross weight</b> : {Number(data?.weight_per_unit).toFixed(2)}gm</p>
  )
}

export default ProductCode
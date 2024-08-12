import React from 'react'

const BulkOrderInputFields = ({formData}:any) => {
   const purityList : any[]=[
    {
        name:'22KT'
    },
    {
        name:'22KT'
    },
    {
        name:'22KT'
    },
    ]
  return (
    <div className="row">
    <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 ">
      <div>
        <div className="fs-14 pt-1">
          Melting<span className="text-danger">*</span>
        </div>
        <select
          name={`purity`}
          className="w-100 input-type-select px-1 form-select"
        //   value={formData?.purity}
        //   onChange={handleChange}
        >
          <option value="" className="px-1">
            Select purity
          </option>
          {purityList?.map((item: any, idx: any) => (
            <option key={idx} value={item?.name} className="px-1">
              {item?.name}
            </option>
          ))}
        </select>
        <div>
          <div className="fs-14 pt-1">Description</div>
          <input
            type="text"
            name="description"
            className="w-100 px-1 form-control"
            // value={formData?.description}
            // onChange={handleChange}
          />
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
      <div>
        <div className="fs-14 pt-1">Customer</div>
        <input
          type="text"
          name="customer"
          className="w-100 px-1 form-control"
        //   value={formData?.customer}
        //   onChange={handleChange}
        //   onKeyDown={(e: any) => {
        //     if (e.key === "Enter") {
        //       handleCustomerName();
        //     }
        //   }}
        />
      </div>

      <div>
        <div className="fs-14 pt-1">
          Date<span className="text-danger">*</span>
        </div>
        <input
          type="date"
          name="transaction_date"
          className="w-100 form-control input-type-select px-1"
        //   value={formData?.transaction_date}
        //   onChange={handleChange}
        />
      </div>
    </div>
  </div>
  )
}

export default BulkOrderInputFields
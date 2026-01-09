import { useEffect } from 'react';
import Select from 'react-select';

const OrderListFilter = ({ filters, setFilters, filterOptions, handlePaginationBtn }: any) => {
    const handleChange = (key: string, value: any) => {
        handlePaginationBtn(0);
        setFilters((prev: any) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="row mb-3">

            {/* Order Date */}
            <div className="col-md-3">
                <label className="fw-bold">Order Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={filters?.transaction_date || ''}
                    onChange={(e) =>
                        handleChange('transaction_date', e.target.value)
                    }
                />
            </div>

            {/* Due Date */}
            <div className="col-md-3">
                <label className="fw-bold">Due Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={filters?.delivery_date || ''}
                    onChange={(e) =>
                        handleChange('delivery_date', e.target.value)
                    }
                />
            </div>

            {/* Customer */}
            <div className="col-md-3">
                <label className="fw-bold">Customer</label>
                <Select
                    options={filterOptions?.customers}
                    value={filters?.customer_name}
                    onChange={(opt) => handleChange('customer_name', opt)}
                    isClearable
                />
            </div>

            {/* Purity */}
            <div className="col-md-3">
                <label className="fw-bold">Purity</label>
                <Select
                    options={filterOptions?.purities}
                    value={filters?.purity}
                    onChange={(opt) => handleChange('purity', opt)}
                    isClearable
                />
            </div>

            {/* Order ID */}
            <div className="col-md-3 mt-2">
                <label className="fw-bold">Order ID</label>
                <Select
                    options={filterOptions?.order_ids}
                    value={filters?.order_id}
                    onChange={(opt) => handleChange('order_id', opt)}
                    isClearable
                />
            </div>

        </div>
    );
};

export default OrderListFilter;

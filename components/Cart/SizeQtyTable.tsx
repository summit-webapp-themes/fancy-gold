import React from 'react';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import styles from '../../styles/components/cartProductDetail.module.scss';

const SizeQtyTable = ({ data, onQtyChange, onDelete }: any) => {
  const handleIncrement = (sizeIndex: number, itemData: any) => {
    const newQty = data.order[sizeIndex].qty + 1;
    onQtyChange(sizeIndex, newQty, itemData);
  };

  const handleDecrement = (sizeIndex: number, itemData: any) => {
    if (data.order[sizeIndex].qty > 1) {
      const newQty = data.order[sizeIndex].qty - 1;
      onQtyChange(sizeIndex, newQty, itemData);
    }
  };

  const handleQtyChange = (sizeIndex: number, itemData: any, e: any) => {
    const newQty = e.target.value;
    onQtyChange(sizeIndex, newQty, itemData);
  };

  const handleDelete = (sizeIndex: number) => {
    onDelete(sizeIndex, data);
  };

  return (
    <>
      <Table bordered responsive className={`${styles.font_12} text-center h-100 m-0`}>
        <thead>
          <tr>
            <th>Colour</th>
            <th>Size (inch)</th>
            <th>Qty</th>
            <th>Weight</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.order?.length > 0 &&
            data?.order?.map((item: any, index: number) => (
              <tr key={index} className="text-center">
                <td>{item?.colour}</td>
                <td>{item?.size}</td>
                <td className="p-0">
                  <InputGroup className="d-flex justify-content-center align-items-center h-100">
                    <button className="border-0 bg-light" onClick={() => handleDecrement(index, data)} disabled={item?.qty <= 1}>
                      <FaMinus />
                    </button>
                    <FormControl
                      type="text"
                      value={item?.qty}
                      className={`text-center border-0 ${styles?.qty_input} ${styles.font_12}`}
                      onChange={(e) => handleQtyChange(index, data, e)}
                      style={{ maxWidth: '50px' }}
                    />
                    <button className="border-0 bg-light" onClick={() => handleIncrement(index, data)}>
                      <FaPlus />
                    </button>
                  </InputGroup>
                </td>
                <td>{item?.weight} gm</td>
                <td className="p-0">
                  <button className="btn p-0 py-1 text-danger" onClick={() => handleDelete(index)}>
                    <RxCross2 />
                  </button>
                </td>
              </tr>
            ))}
          <tr>
            <td colSpan={3} className="text-start fw-bold">
              Total Weight
            </td>
            <td colSpan={2} className="text-end fw-bold">
              {Number(data?.total_weight).toFixed(3)} gm
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default SizeQtyTable;

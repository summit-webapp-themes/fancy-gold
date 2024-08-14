import React from "react";

const QuickOrderCard = ({
  quickOrderData,
  index,
  handleDltQuickOrderRecord,
}: any) => {
  return (
    <>
      <tr className=" border-bottom ">
        <td className="border-0 text-center">
          <strong>{index + 1}</strong>
        </td>
        <td className="border-0">
          <strong>{quickOrderData.item_code}</strong>
        </td>
        <td className="">
          <div className="row">
            {quickOrderData.qty_size_list?.length > 0 ? (
              <>
                {quickOrderData.qty_size_list.map((item: any, index: any) => (
                  <>
                    <div className="col-6 py-1">
                      <strong> {item.size}</strong>
                    </div>
                    <div className="col-6 py-1">
                      <strong> {item.qty}</strong>
                    </div>
                  </>
                ))}
              </>
            ) : (
              ""
            )}
          </div>
        </td>
        <td>
          <div className="">
            <button
              type="button"
              className="btn-close main-btn-cross  "

              onClick={() => handleDltQuickOrderRecord(index)}
            >

            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default QuickOrderCard;

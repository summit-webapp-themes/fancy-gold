import React from "react";
import Breadcrumb from "../../components/breadcrumb";

const BulkOrderBreadCrumb = () => {
  return (
    <div className="breadcrumb-sec">
      <div className="container-lg">
        <div className="row">
          <div className="col-12">
            <Breadcrumb
              breadcrumbs={[
                { to: "/", name: "Home" },
                { to: "/bulk-order", name: "Bulk Order" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderBreadCrumb;

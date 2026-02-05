import React from 'react';
import useDashBoard from '../../hooks/DashBoard/useDashBoard-hook';
import DashboardLoading from './DashBoardLoading';

const DashBoard = () => {

  const {
    data,
    purity,
    selectedPurity,
    setSelectedPurity,
    factories,
    selectedFactory,
    setSelectedFactory,
    handleCardClick,
    colorMap,
    isLoading,
  } = useDashBoard();

  function hexToRGBA(hex: string, opacity: number): string {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (!isLoading) {
    return <DashboardLoading />
  }
  return (
    <div className="container mt-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-8 text-start">
          <h3 className="fw-bold">
            Purity: {selectedPurity}
            {selectedFactory && ` | Factory: ${selectedFactory}`}
          </h3>
        </div>

        {/* Factory Select */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedFactory}
            onChange={(e) => setSelectedFactory(e.target.value)}
          >
            {factories.map((factory, index) => (
              <option key={index} value={factory.name}>
                {factory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={selectedPurity} onChange={(e) => setSelectedPurity(e.target.value)}>
            {purity?.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-4">
        {data?.map((item: any, index: any) => (
          <div key={index} className="col-md-4">
            <div
              className="card text-white h-100 border-none"
              onClick={() => handleCardClick(item?.link)}
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.5s ease',
                backgroundColor: colorMap[item.report_name],
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hexToRGBA(colorMap[item.report_name], 0.85))}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = colorMap[item.report_name])}
            >
              <div className="card-body">
                <h5 className="card-title">{item.report_name.toUpperCase()}</h5>
                <p className="card-text">
                  {item.total_weight.toFixed(0)} GMS
                  <br />
                  {item.total_qty} Quantity
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;

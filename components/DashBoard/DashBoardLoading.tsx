const DashboardLoading = () => {
  const placeholderCards = Array(6).fill(null); // 6 skeleton cards

  return (
    <div className="row g-4">
      {placeholderCards.map((_, index) => (
        <div key={index} className="col-md-4">
          <div
            className="card h-100"
            style={{
              backgroundColor: '#e0e0e0',
              border: 'none',
              animation: 'pulse 1.5s infinite',
            }}
          >
            <div className="card-body">
              <div className="placeholder-glow mb-3">
                <span className="placeholder col-8"></span>
              </div>
              <div className="placeholder-glow">
                <span className="placeholder col-6 mb-2"></span>
                {/* <span className="placeholder col-4"></span> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardLoading;
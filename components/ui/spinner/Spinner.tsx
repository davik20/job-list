import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Spinner;

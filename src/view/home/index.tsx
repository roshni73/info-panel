import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard Overview</h1>
      <p className="text-gray-600 mb-8">Welcome to your analytics dashboard</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-[#0099A8]">1,248</p>
          <p className="text-sm text-gray-500 mt-2">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-[#0099A8]">$24,580</p>
          <p className="text-sm text-gray-500 mt-2">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold text-[#0099A8]">3.2%</p>
          <p className="text-sm text-gray-500 mt-2">+0.4% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
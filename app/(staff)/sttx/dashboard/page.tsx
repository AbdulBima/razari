import React from 'react';

const StaffDashboard: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
                <h1 className="text-2xl font-bold text-center">Dashboard</h1>
                <p className="text-gray-500 text-center">Welcome to your dashboard!</p>
            </div>
        </div>
    );
};

export default StaffDashboard;
import React from "react";

const EmployeeDetailsModal = ({ employee, setSelectedEmployee }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">Employee Details</h3>
                        <button
                            onClick={() => setSelectedEmployee(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{employee.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Role:</span>
                            <span className="font-medium">{employee.role}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Department:</span>
                            <span className="font-medium">{employee.department}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Direct Number:</span>
                            <span className="font-medium">{employee.directNumber}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">VoIP Number:</span>
                            <span className="font-medium">{employee.voipNumber}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{employee.workLocation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetailsModal;
import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = ({ userRole, filters, searchText, setSelectedEmployee }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/directory", {
                    params: {
                        administration_id: filters.administration,
                        department_id: filters.department,
                        location_id: filters.location,
                        job_title_id: filters.role,
                    },
                });
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, [filters]);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-right border-collapse">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold">Role</th>
                            <th className="px-6 py-4 text-sm font-semibold">Department</th>
                            <th className="px-6 py-4 text-sm font-semibold">Internal Number</th>
                            <th className="px-6 py-4 text-sm font-semibold">Direct Number</th>
                            <th className="px-6 py-4 text-sm font-semibold">VoIP Number</th>
                            <th className="px-6 py-4 text-sm font-semibold">Location</th>
                            {userRole === "admin" && (
                                <th className="px-6 py-4 text-sm font-semibold">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            employees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="border-b hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer"
                                    onClick={() => setSelectedEmployee(employee)}
                                >
                                    <td className="px-6 py-4 font-medium border-t text-gray-700">{employee.name}</td>
                                    <td className="px-6 py-4 border-t">{employee.role}</td>
                                    <td className="px-6 py-4 border-t">{employee.department}</td>
                                    <td className="px-6 py-4 border-t">{employee.internalNumber || "N/A"}</td>
                                    <td className="px-6 py-4 border-t">{employee.directNumber || "N/A"}</td>
                                    <td className="px-6 py-4 border-t">{employee.voipNumber || "N/A"}</td>
                                    <td className="px-6 py-4 border-t">{employee.workLocation || "N/A"}</td>
                                    {userRole === "admin" && (
                                        <td className="px-6 py-4 border-t">
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                            >
                                                Update
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={userRole === "admin" ? 8 : 7}
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No employees found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {userRole === "admin" && (
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                    Add Employee
                </button>
            )}
        </div>
    );
};

export default EmployeeList;
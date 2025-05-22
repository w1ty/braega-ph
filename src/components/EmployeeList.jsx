import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = ({ userRole, filters, searchText, setSelectedEmployee }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            if (filters.administration) {
                try {
                    const response = await axios.get("https://braega-ph.onrender.com/api/departments", {
                        params: { administration_id: filters.administration },
                    });
                    setDepartments(response.data);
                } catch (error) {
                    console.error("Error fetching departments:", error);
                }
            } else {
                setDepartments([]);
            }
        };

        fetchDepartments();
    }, [filters.administration]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get("https://braega-ph.onrender.com/api/directory", {
                    params: {
                        administration_id: filters.administration,
                        department_id: filters.department,
                        location_id: filters.location,
                        job_title_id: filters.role,
                        search: searchText,
                    },
                });

                const mappedEmployees = response.data.map((employee) => ({
                    id: employee.id,
                    name: employee.name || "غير معروف",
                    role: employee.role_name || "غير معروف",
                    department: `${employee.administration_name || "غير معروف"} - ${employee.department_name || "غير معروف"}`,
                    internalNumber: employee.internal_number || "غير متوفر",
                    directNumber: employee.external_number || "غير متوفر",
                    voipNumber: employee.voip_number || "غير متوفر",
                    workLocation: employee.location_name || "غير معروف",
                }));

                setEmployees(mappedEmployees);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setError("فشل في تحميل الموظفين. يرجى المحاولة مرة أخرى لاحقًا.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [filters, searchText]);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                {loading ? (
                    <p className="text-center py-4">جاري التحميل...</p>
                ) : error ? (
                    <p className="text-center text-red-500 py-4">{error}</p>
                ) : (
                    <table className="min-w-full text-right border-collapse">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold">الاسم</th>
                                <th className="px-6 py-4 text-sm font-semibold">الدور</th>
                                <th className="px-6 py-4 text-sm font-semibold">الإدارة - القسم</th>
                                <th className="px-6 py-4 text-sm font-semibold">الرقم الداخلي</th>
                                <th className="px-6 py-4 text-sm font-semibold">الرقم المباشر</th>
                                <th className="px-6 py-4 text-sm font-semibold">رقم VoIP</th>
                                <th className="px-6 py-4 text-sm font-semibold">الموقع</th>
                                {userRole === "admin" && (
                                    <th className="px-6 py-4 text-sm font-semibold">الإجراءات</th>
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
                                        <td className="px-6 py-4 border-t">{employee.internalNumber}</td>
                                        <td className="px-6 py-4 border-t">{employee.directNumber}</td>
                                        <td className="px-6 py-4 border-t">{employee.voipNumber}</td>
                                        <td className="px-6 py-4 border-t">{employee.workLocation}</td>
                                        {userRole === "admin" && (
                                            <td className="px-6 py-4 border-t">
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                                                >
                                                    حذف
                                                </button>
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                                >
                                                    تعديل
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
                                        لم يتم العثور على موظفين.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            {userRole === "admin" && (
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                    إضافة موظف
                </button>
            )}
        </div>
    );
};

export default EmployeeList;
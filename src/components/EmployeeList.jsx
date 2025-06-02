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
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-blue-700">
            <div className="overflow-x-auto">
                {loading ? (
                    <p className="text-center py-8 text-lg text-blue-700 font-semibold">جاري التحميل...</p>
                ) : error ? (
                    <p className="text-center text-blue-700 py-8 text-lg font-semibold">{error}</p>
                ) : (
                    <table className="min-w-full text-right border-collapse">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="px-6 py-4 text-base font-bold tracking-wide">الاسم</th>
                                <th className="px-6 py-4 text-base font-bold tracking-wide">الدور</th>
                                <th className="px-6 py-4 text-base font-bold tracking-wide">الإدارة - القسم</th>
                                <th className="px-6 py-4 text-base font-bold tracking-wide">الرقم الداخلي</th>
                                <th className="px-6 py-4 text-base font-bold tracking-wide">الرقم المباشر</th>
                                <th className="px-6 py-4 text-base font-bold tracking-wide">رقم VoIP</th>
                                <th className="px-6 py-4 text-base font-bold tracking-wide">الموقع</th>
                                {userRole === "admin" && (
                                    <th className="px-6 py-4 text-base font-bold tracking-wide">الإجراءات</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className="border-b hover:bg-blue-50 transition duration-200 ease-in-out cursor-pointer group"
                                        onClick={() => setSelectedEmployee(employee)}
                                    >
                                        <td className="px-6 py-4 font-medium border-t text-gray-800 group-hover:text-blue-700">{employee.name}</td>
                                        <td className="px-6 py-4 border-t text-blue-900">{employee.role}</td>
                                        <td className="px-6 py-4 border-t text-blue-900">{employee.department}</td>
                                        <td className="px-6 py-4 border-t text-blue-900">{employee.internalNumber}</td>
                                        <td className="px-6 py-4 border-t text-blue-900">{employee.directNumber}</td>
                                        <td className="px-6 py-4 border-t text-blue-900">{employee.voipNumber}</td>
                                        <td className="px-6 py-4 border-t text-blue-900">{employee.workLocation}</td>
                                        {userRole === "admin" && (
                                            <td className="px-6 py-4 border-t flex gap-2">
                                                <button
                                                    className="bg-blue-700 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-800 transition font-semibold"
                                                >
                                                    حذف
                                                </button>
                                                <button
                                                    className="bg-white text-blue-700 px-3 py-1 rounded-lg shadow hover:bg-blue-50 transition font-semibold border border-blue-200"
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
                                        className="px-6 py-8 text-center text-blue-300 text-lg font-semibold"
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
                <div className="flex justify-end p-6">
                    <button
                        className="bg-blue-700 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-800 transition font-semibold text-lg"
                    >
                        + إضافة موظف
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
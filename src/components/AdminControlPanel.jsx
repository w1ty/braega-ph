import React, { useState, useEffect } from "react";
import logo from "../assets/react.svg"; // Replace with your company logo if available
import Header from "./Header";
import Footer from "./Footer";

const AdminControlPanel = () => {
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        internalNumber: "",
        directNumber: "",
        voipNumber: "",
        role: "",
        location: "",
        department: "",
        administration: "",
    });
    const [metadata, setMetadata] = useState({
        roles: [],
        locations: [],
        departments: [],
        administrations: [],
    });
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editEmployee, setEditEmployee] = useState(null);

    useEffect(() => {
        fetch("https://braega-ph.onrender.com/api/metadata")
            .then((response) => response.json())
            .then((data) => setMetadata(data))
            .catch((error) => console.error("Error fetching metadata:", error));
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://braega-ph.onrender.com/api/directory");
                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError("Failed to fetch employees.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAddEmployee = () => {
        console.log("New Employee Data:", newEmployee);
        const mappedEmployee = {
            name: newEmployee.name,
            internal_number: newEmployee.internalNumber,
            external_number: newEmployee.directNumber,
            voip_number: newEmployee.voipNumber,
            role_id: newEmployee.role,
            location_id: newEmployee.location,
            department_id: newEmployee.department,
            administration_id: newEmployee.administration,
        };

        fetch("https://braega-ph.onrender.com/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mappedEmployee),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add employee");
                }
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                setNewEmployee({
                    name: "",
                    internalNumber: "",
                    directNumber: "",
                    voipNumber: "",
                    role: "",
                    location: "",
                    department: "",
                    administration: "",
                });
            })
            .catch((error) => {
                console.error(error);
                alert("خطأ في إضافة الموظف.");
            });
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://braega-ph.onrender.com/api/employees/${id}`, { method: "DELETE" });
            setEmployees(employees.filter((employee) => employee.id !== id));
        } catch (err) {
            alert("Failed to delete employee.");
        }
    };

    const handleUpdate = (employee) => {
        setEditEmployee(employee);
    };

    return (
        <div
            className="min-h-screen flex flex-col justify-between font-sans"
            dir="rtl"
            style={{
                backgroundImage: 'url(/bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Header />
            <div className="container mx-auto flex flex-col items-center justify-center flex-grow" style={{ marginTop: '2%' }}>
                <div className="w-full max-w-5xl">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-red-600 mb-8">
                        <h2 className="text-2xl font-bold text-red-700 mb-6 border-b pb-2 border-red-200">إضافة موظف جديد</h2>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الرقم الداخلي</label>
                                <input
                                    type="number"
                                    name="internalNumber"
                                    value={newEmployee.internalNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الرقم المباشر</label>
                                <input
                                    type="number"
                                    name="directNumber"
                                    value={newEmployee.directNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">رقم VoIP</label>
                                <input
                                    type="number"
                                    name="voipNumber"
                                    value={newEmployee.voipNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الصفة</label>
                                <select
                                    name="role"
                                    value={newEmployee.role}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">اختر الصفة </option>
                                    {metadata.roles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                                <select
                                    name="location"
                                    value={newEmployee.location}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">اختر الموقع</option>
                                    {metadata.locations.map((location) => (
                                        <option key={location.id} value={location.id}>{location.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الإدارة</label>
                                <select
                                    name="administration"
                                    value={newEmployee.administration}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">اختر الإدارة</option>
                                    {metadata.administrations.map((administration) => (
                                        <option key={administration.id} value={administration.id}>{administration.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                                <select
                                    name="department"
                                    value={newEmployee.department}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">اختر القسم</option>
                                    {metadata.departments.map((department) => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleAddEmployee}
                            className="bg-red-600 text-white px-8 py-3 rounded-xl shadow hover:bg-red-700 transition duration-200 font-semibold text-lg tracking-wide"
                        >
                            إضافة موظف جديد
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8 border-red-600">
                        <h2 className="text-2xl font-bold text-red-700 mb-6 border-b pb-2 border-red-200">قائمة الموظفين</h2>
                        {loading ? (
                            <p>جاري التحميل...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-right border-collapse">
                                    <thead className="bg-red-700 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-sm font-semibold">الاسم</th>
                                            <th className="px-6 py-4 text-sm font-semibold">الصفة</th>
                                            <th className="px-6 py-4 text-sm font-semibold">الإدارة - القسم</th>
                                            <th className="px-6 py-4 text-sm font-semibold">الرقم الداخلي</th>
                                            <th className="px-6 py-4 text-sm font-semibold">الرقم المباشر</th>
                                            <th className="px-6 py-4 text-sm font-semibold">رقم VoIP</th>
                                            <th className="px-6 py-4 text-sm font-semibold">الموقع</th>
                                            <th className="px-6 py-4 text-sm font-semibold">الإجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.map((employee) => (
                                            <tr key={employee.id} className="border-b hover:bg-blue-50 transition">
                                                <td className="px-6 py-4">{employee.name}</td>
                                                <td className="px-6 py-4">{employee.role_name}</td>
                                                <td className="px-6 py-4">{employee.administration_name} - {employee.department_name}</td>
                                                <td className="px-6 py-4">{employee.internal_number}</td>
                                                <td className="px-6 py-4">{employee.external_number}</td>
                                                <td className="px-6 py-4">{employee.voip_number}</td>
                                                <td className="px-6 py-4">{employee.location_name}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleDelete(employee.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition mr-2"
                                                    >
                                                        حذف
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdate(employee)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition"
                                                    >
                                                        تعديل
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {editEmployee && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl border-t-8 border-red-600 relative animate-fade-in">
                        <button
                            type="button"
                            onClick={() => setEditEmployee(null)}
                            className="absolute top-4 left-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
                            aria-label="إغلاق"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-6 text-red-700 border-b pb-2 border-red-200">تعديل بيانات الموظف</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                fetch(`https://braega-ph.onrender.com/api/update/employee/${editEmployee.id}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(editEmployee),
                                })
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error("Failed to update employee");
                                        }
                                        return response.json();
                                    })
                                    .then(() => {
                                        alert("Employee updated successfully");
                                        setEmployees((prev) =>
                                            prev.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
                                        );
                                        setEditEmployee(null);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        alert("Failed to update employee.");
                                    });
                            }}
                        >
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                                    <input
                                        type="text"
                                        value={editEmployee.name}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الرقم الداخلي</label>
                                    <input
                                        type="text"
                                        value={editEmployee.internal_number}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, internal_number: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الرقم المباشر</label>
                                    <input
                                        type="text"
                                        value={editEmployee.external_number}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, external_number: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم VoIP</label>
                                    <input
                                        type="text"
                                        value={editEmployee.voip_number}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, voip_number: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الموقع</label>
                                    <input
                                        type="text"
                                        value={editEmployee.location_name}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, location_name: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الإدارة</label>
                                    <select
                                        value={editEmployee.administration}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, administration: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">اختر الإدارة</option>
                                        {metadata.administrations.map((administration) => (
                                            <option key={administration.id} value={administration.id}>{administration.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                                    <select
                                        value={editEmployee.department_id}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, department_id: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">اختر القسم</option>
                                        {metadata.departments.map((department) => (
                                            <option key={department.id} value={department.id}>{department.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">الصفة</label>
                                    <select
                                        value={editEmployee.role_id}
                                        onChange={(e) => setEditEmployee({ ...editEmployee, role_id: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">اختر الصفة</option>
                                        {metadata.roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    onClick={() => setEditEmployee(null)}
                                    className="bg-gray-400 text-white px-6 py-2 rounded-lg mr-2 hover:bg-gray-500 transition"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition font-semibold"
                                >
                                    حفظ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AdminControlPanel;
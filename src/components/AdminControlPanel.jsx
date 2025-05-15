import React, { useState, useEffect } from "react";

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

    useEffect(() => {
        fetch("http://localhost:3000/api/metadata")
            .then((response) => response.json())
            .then((data) => setMetadata(data))
            .catch((error) => console.error("Error fetching metadata:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAddEmployee = () => {
        fetch("http://localhost:3000/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmployee),
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

    return (
        <div className="admin-control-panel bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">لوحة التحكم الإدارية</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">الدور</label>
                        <select
                            name="role"
                            value={newEmployee.role}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">اختر الدور</option>
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
                <div className="grid grid-cols-2 gap-4 mb-4">
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
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
                >
                    إضافة موظف جديد
                </button>
            </div>
        </div>
    );
};

export default AdminControlPanel;
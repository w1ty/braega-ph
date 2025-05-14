import React, { useState, useEffect } from "react";
import axios from "axios";

const Filters = ({ filters, setFilters }) => {
    const [locations, setLocations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [administrations, setAdministrations] = useState([]);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/metadata");
                const { locations, roles, departments, administrations } = response.data;

                // Map roles to use the correct key "title" instead of "name"
                const mappedRoles = roles.map((role) => ({ id: role.id, name: role.title }));

                setLocations(locations);
                setRoles(mappedRoles);
                setAdministrations(administrations);
            } catch (error) {
                console.error("خطأ في جلب البيانات الوصفية للفلاتر:", error);
            }
        };

        fetchMetadata();
    }, []);

    const handleFilterChange = async (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));

        if (name === "administration") {
            try {
                const response = await axios.get("http://localhost:3000/api/departments", {
                    params: { administration_id: value },
                });
                setDepartments(response.data);
            } catch (error) {
                console.error("خطأ في جلب الأقسام:", error);
            }
        }
    };

    const resetFilters = () => {
        setFilters({
            location: "",
            role: "",
            administration: "",
            department: "",
        });
        setDepartments([]);
    };

    return (
        <div className="flex flex-wrap gap-4 items-end">
            <FilterDropdown
                label="الموقع"
                name="location"
                options={locations}
                value={filters.location}
                onChange={handleFilterChange}
            />
            <FilterDropdown
                label="الصفة الوظيفية"
                name="role"
                options={roles}
                value={filters.role}
                onChange={handleFilterChange}
            />
            <FilterDropdown
                label="الإدارة"
                name="administration"
                options={administrations}
                value={filters.administration}
                onChange={handleFilterChange}
            />
            {departments.length > 0 && (
                <FilterDropdown
                    label="القسم"
                    name="department"
                    options={departments}
                    value={filters.department}
                    onChange={handleFilterChange}
                />
            )}
            <div className="min-w-[150px]">
                <button
                    onClick={resetFilters}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                >
                    إعادة تعيين
                </button>
            </div>
        </div>
    );
};

const FilterDropdown = ({ label, name, options, value, onChange }) => (
    <div className="flex-1 min-w-[180px]">
        <label className="block text-gray-700 mb-2">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border border-blue-500 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
            <option value="">الكل</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    </div>
);

export default Filters;

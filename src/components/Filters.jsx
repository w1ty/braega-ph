import React, { useState } from "react";

const Filters = ({ filters, setFilters }) => {
    const locations = [
        { label: "كل المواقع", value: "" },
        { label: "الإدارة العامة", value: "HO" },
        { label: "رأس المنقار", value: "RM" },
        { label: "أعضاء اللجنة", value: "CM" },
        { label: "الميناء", value: "P" },
        { label: "المطار", value: "A" },
        { label: "المستودع", value: "W" }
    ];

    const roles = [
        { label: "كل الصفات", value: "" },
        { label: "مدير", value: "Mgr" },
        { label: "مهندس", value: "Eng" },
        { label: "فني", value: "Tech" },
        { label: "إداري", value: "Admin" },
        { label: "مساعد إداري", value: "AdminAsst" }
    ];

    const departments = [
        { label: "كل الإدارات", value: "" },
        { label: "الحاسب الآلي", value: "IT" },
        { label: "الاتصالات", value: "Comm" },
        { label: "التشغيل", value: "Ops" }
    ];

    const sectionsByDepartment = {
        IT: [
            { label: "الشبكات", value: "Net" },
            { label: "البرمجيات", value: "Soft" },
            { label: "الدعم الفني", value: "Sup" }
        ],
        Comm: [
            { label: "الصيانة", value: "Maint" },
            { label: "العمليات", value: "Ops" }
        ],
        Ops: [
            { label: "المراقبة", value: "Mon" },
            { label: "الإشراف", value: "Sup" }
        ]
    };

    const [sections, setSections] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));

        if (name === "department") {
            setSections(value === "" ? [] : [{ label: "كل الأقسام", value: "" }, ...sectionsByDepartment[value]]);
            setFilters((prev) => ({ ...prev, section: "" })); // Reset section when department changes
        }
    };

    const resetFilters = () => {
        setFilters({
            location: "",
            role: "",
            department: "",
            section: ""
        });
        setSections([]);
    };

    return (
        <div className="flex flex-wrap gap-4 items-end">
            {/* Location Filter */}
            <FilterDropdown
                label="موقع العمل"
                name="location"
                options={locations}
                value={filters.location}
                onChange={handleFilterChange}
            />

            {/* Role Filter */}
            <FilterDropdown
                label="الصفة الوظيفية"
                name="role"
                options={roles}
                value={filters.role}
                onChange={handleFilterChange}
            />

            {/* Department Filter */}
            <FilterDropdown
                label="الإدارة"
                name="department"
                options={departments}
                value={filters.department}
                onChange={handleFilterChange}
            />

            {/* Section Filter */}
            {sections.length > 0 && (
                <FilterDropdown
                    label="القسم"
                    name="section"
                    options={sections}
                    value={filters.section}
                    onChange={handleFilterChange}
                />
            )}

            {/* Reset Button */}
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
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default Filters;

import React, { useState } from "react";

const Filters = ({ filters, setFilters }) => {
    const locations = [
        "كل المواقع",
        "الإدارة العامة",
        "رأس المنقار",
        "أعضاء اللجنة",
        "الميناء",
        "المطار",
        "المستودع"
    ];
    const roles = [
        "كل الصفات",
        "مدير",
        "مهندس",
        "فني",
        "إداري",
        "مساعد إداري",
        "محاسب"
    ];
    const departments = [
        "كل الإدارات",
        "إدارة الحاسب الآلي",
        "إدارة الاتصالات",
        "إدارة التشغيل"
    ];

    const sectionsByDepartment = {
        "إدارة الحاسب الآلي": ["الشبكات", "البرمجيات", "الدعم الفني"],
        "إدارة الاتصالات": ["الصيانة", "التشغيل"],
        "إدارة التشغيل": ["المراقبة", "الإشراف"]
    };

    const [sections, setSections] = useState([]);

    const handleFilterChange = e => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));

        if (name === "department") {
            setSections(sectionsByDepartment[value] || []);
            setFilters(prev => ({ ...prev, section: "" })); // Reset section when department changes
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
            <div className="flex-1 min-w-[180px]">
                <label className="block text-gray-700 mb-2">موقع العمل</label>
                <select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    className="w-full border border-blue-500 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    {locations.map((loc, index) => (
                        <option
                            key={index}
                            value={loc === "كل المواقع" ? "" : loc}
                        >
                            {loc}
                        </option>
                    ))}
                </select>
            </div>

            {/* Role Filter */}
            <div className="flex-1 min-w-[180px]">
                <label className="block text-gray-700 mb-2">
                    الصفة الوظيفية
                </label>
                <select
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                    className="w-full border border-blue-500 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    {roles.map((role, index) => (
                        <option
                            key={index}
                            value={role === "كل الصفات" ? "" : role}
                        >
                            {role}
                        </option>
                    ))}
                </select>
            </div>

            {/* Department Filter */}
            <div className="flex-1 min-w-[180px]">
                <label className="block text-gray-700 mb-2">الإدارة</label>
                <select
                    name="department"
                    value={filters.department}
                    onChange={handleFilterChange}
                    className="w-full border border-blue-500 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    {departments.map((dept, index) => (
                        <option
                            key={index}
                            value={dept === "كل الإدارات" ? "" : dept}
                        >
                            {dept}
                        </option>
                    ))}
                </select>
            </div>

            {/* Section Filter */}
            {sections.length > 0 && (
                <div className="flex-1 min-w-[180px]">
                    <label className="block text-gray-700 mb-2">القسم</label>
                    <select
                        name="section"
                        value={filters.section || ""}
                        onChange={handleFilterChange}
                        className="w-full border border-blue-500 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="">كل الأقسام</option>
                        {sections.map((section, index) => (
                            <option key={index} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                </div>
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

export default Filters;

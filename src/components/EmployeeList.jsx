import React from "react";

const EmployeeList = ({ employees, filters, searchText, setSelectedEmployee }) => {
    const roleMap = {
        Tech: "فني",
        Mgr: "مدير",
        Eng: "مهندس",
        Admin: "إداري",
        AdminAsst: "مساعد إداري"
    };

    const departmentMap = {
        "IT/Net": "الحاسب الآلي والشبكات",
        "IT/Soft": "الحاسب الآلي والبرمجيات",
        "Ops/Mon": "التشغيل والمراقبة",
        "IT/Sup": "الحاسب الآلي والدعم الفني",
        "Comm/Maint": "الاتصالات والصيانة",
        "Ops/Sup": "التشغيل والإشراف",
        "Comm/Ops": "الاتصالات والعمليات"
    };

    const locationMap = {
        HO: "المقر الرئيسي",
        P: "الميناء",
        CM: "أعضاء اللجنة",
        RM: "رأس المنقار",
        W: "المخزن",
        A: "المطار"
    };

    const sectionMap = {
        Net: "الشبكات",
        Soft: "البرمجيات",
        Sup: "الدعم الفني",
        Maint: "الصيانة",
        Ops: "العمليات",
        Mon: "المراقبة"
    };

    const filteredEmployees = employees.filter((employee) => {
        const searchLower = searchText.toLowerCase();
        return (
            (employee.name.toLowerCase().includes(searchLower) ||
                employee.internalNumber.includes(searchText) ||
                employee.directNumber.includes(searchText) ||
                employee.voipNumber.includes(searchText)) &&
            (filters.location === "" || employee.workLocation === filters.location) &&
            (filters.role === "" || employee.role === filters.role) &&
            (filters.department === "" || employee.department === filters.department) &&
            (filters.section === "" || employee.section === filters.section)
        );
    });

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-right border-collapse">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold">الاسم</th>
                            <th className="px-6 py-4 text-sm font-semibold">الصفة الوظيفية</th>
                            <th className="px-6 py-4 text-sm font-semibold">الإدارة والقسم</th>
                            <th className="px-6 py-4 text-sm font-semibold">الرقم الداخلي</th>
                            <th className="px-6 py-4 text-sm font-semibold">الرقم المباشر</th>
                            <th className="px-6 py-4 text-sm font-semibold">رقم VoIP</th>
                            <th className="px-6 py-4 text-sm font-semibold">موقع العمل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                                <tr
                                    key={employee.id}
                                    className="border-b hover:bg-blue-100 transition duration-200 ease-in-out cursor-pointer"
                                    onClick={() => setSelectedEmployee(employee)}
                                >
                                    <td className="px-6 py-4 font-medium border-t text-gray-700">{employee.name}</td>
                                    <td className="px-6 py-4 border-t">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                employee.role === "Mgr"
                                                    ? "bg-purple-200 text-purple-800"
                                                    : employee.role === "Eng"
                                                    ? "bg-blue-200 text-blue-800"
                                                    : employee.role === "Tech"
                                                    ? "bg-green-200 text-green-800"
                                                    : "bg-gray-200 text-gray-800"
                                            }`}
                                        >
                                            {roleMap[employee.role]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-t text-gray-600">{departmentMap[employee.department]} و {sectionMap[employee.section]}</td>
                                    <td className="px-6 py-4 border-t text-gray-600">{employee.internalNumber}</td>
                                    <td className="px-6 py-4 border-t text-gray-600">{employee.directNumber}</td>
                                    <td className="px-6 py-4 border-t text-gray-600">{employee.voipNumber}</td>
                                    <td className="px-6 py-4 border-t text-gray-600">{locationMap[employee.workLocation]}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-6 text-gray-500 border-t"
                                >
                                    لا توجد نتائج مطابقة
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
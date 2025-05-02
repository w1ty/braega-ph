import React, { useState } from "react";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
const PhoneDirectory = () => {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        role: "",
        department: ""
    });

    const employees = [
        {
            id: 1,
            name: "عبدالوهاب بوكمار",
            role: "مشغل أجهزة رابع",
            department: "إدارة الحاسب الآلي",
            internalNumber: "31100",
            directNumber: "0612233000",
            reefNumber: "0612288111",
            voipNumber: "35101",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 2,
            name: "أحمد جعفر",
            role: "رئيس الشبكات",
            department: "إدارة الحاسب الآلي",
            internalNumber: "31101",
            directNumber: "0612233001",
            reefNumber: "0612288222",
            voipNumber: "35102",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 3,
            name: "كمال الوزري",
            role: "منسق الاتصالات السلكية",
            department: "إدارة الاتصالات",
            internalNumber: "31102",
            directNumber: "0612233002",
            reefNumber: "0612288333",
            voipNumber: "35103",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 4,
            name: "عمر المانع",
            role: "فني اتصالات",
            department: "إدارة الاتصالات",
            internalNumber: "31103",
            directNumber: "0612233003",
            reefNumber: "0612288444",
            voipNumber: "35104",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 5,
            name: "محمد البرغثي",
            role: "مهندس اتصالات أول",
            department: "إدارة الاتصالات",
            internalNumber: "31104",
            directNumber: "0612233004",
            reefNumber: "0612288555",
            voipNumber: "35105",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 6,
            name: "احمد رعيض",
            role: "منسق الاتصالات اللاسلكية",
            department: "إدارة الاتصالات",
            internalNumber: "31105",
            directNumber: "0612233005",
            reefNumber: "0612288666",
            voipNumber: "35106",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 7,
            name: "فتحي الكوافي",
            role: "رئيس قسم الألياف البصرية",
            department: "إدارة الاتصالات",
            internalNumber: "31106",
            directNumber: "0612233006",
            reefNumber: "0612288777",
            voipNumber: "35107",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 8,
            name: "نجيب الكوافي",
            role: "مهندس اتصالات أول",
            department: "إدارة الاتصالات",
            internalNumber: "31107",
            directNumber: "0612233007",
            reefNumber: "0612288888",
            voipNumber: "35108",
            workLocation: "البركة عمارة 551"
        },
        {
            id: 9,
            name: "فراس امراجع",
            role: "فني تشغيل",
            department: "إدارة التشغيل",
            internalNumber: "31108",
            directNumber: "0612233008",
            reefNumber: "0612288999",
            voipNumber: "35109",
            workLocation: "مستودع رأس المنقار"
        },
        {
            id: 10,
            name: "نادر العقوري",
            role: "مشغل أول",
            department: "إدارة التشغيل",
            internalNumber: "31109",
            directNumber: "0612233009",
            reefNumber: "0612289000",
            voipNumber: "35110",
            workLocation: "مستودع رأس المنقار"
        },
        {
            id: 11,
            name: "خالد الصغير",
            role: "مفتش تشغيل",
            department: "إدارة التشغيل",
            internalNumber: "31110",
            directNumber: "0612233010",
            reefNumber: "0612289111",
            voipNumber: "35111",
            workLocation: "مستودع رأس المنقار"
        },
        {
            id: 12,
            name: "علي بن ناصر",
            role: "رئيس قسم التشغيل",
            department: "إدارة التشغيل",
            internalNumber: "31111",
            directNumber: "0612233011",
            reefNumber: "0612289222",
            voipNumber: "35112",
            workLocation: "مستودع رأس المنقار"
        },
        {
            id: 13,
            name: "آمنة الدرسي",
            role: "مهندسة اتصالات",
            department: "إدارة الحاسب الآلي و الاتصالات",
            internalNumber: "31112",
            directNumber: "0612233012",
            reefNumber: "0612289333",
            voipNumber: "35113",
            workLocation: "رأس المنقار"
        },
        {
            id: 14,
            name: "عبدالفتاح البركي",
            role: "مساعد إداري",
            department: "إدارة الحاسب الآلي و الاتصالات",
            internalNumber: "31113",
            directNumber: "0612233013",
            reefNumber: "0612289444",
            voipNumber: "35114",
            workLocation: "رأس المنقار"
        }
    ];

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
        "الإدارة العامة",
        "رأس المنقار",
        "أعضاء اللجنة",
        "الميناء",
        "المطار",
        "المستودع"
    ];

    const handleFilterChange = e => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]:
                value === "كل المواقع" ||
                value === "كل الصفات" ||
                value === "كل الإدارات"
                    ? ""
                    : value
        }));
    };

    const filteredEmployees = employees.filter(employee => {
        const searchLower = searchText.toLowerCase();
        const matchesSearch =
            employee.name.toLowerCase().includes(searchLower) ||
            employee.internalNumber.includes(searchText) ||
            employee.directNumber.includes(searchText) ||
            employee.reefNumber.includes(searchText) ||
            (employee.voipNumber && employee.voipNumber.includes(searchText));

        const matchesLocation =
            !filters.location ||
            employee.workLocation.includes(filters.location);

        const matchesRole = !filters.role || employee.role === filters.role;

        const matchesDepartment =
            !filters.department || employee.department === filters.department;

        return (
            matchesSearch && matchesLocation && matchesRole && matchesDepartment
        );
    });

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    return (
        <div className="font-['Cairo'] min-h-screen bg-gray-100">
            <Header />

            <main className="container mx-auto px-4 py-8">
                {/* Search and Filters Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-gray-700 mb-2">
                                بحث سريع
                            </label>
                            <input
                                type="text"
                                placeholder="ابحث بالاسم أو الرقم..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </div>

                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-gray-700 mb-2">
                                موقع العمل
                            </label>
                            <select
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-gray-700 mb-2">
                                الصفة الوظيفية
                            </label>
                            <select
                                name="role"
                                value={filters.role}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-gray-700 mb-2">
                                الإدارة
                            </label>
                            <select
                                name="department"
                                value={filters.department}
                                onChange={handleFilterChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {departments.map((dept, index) => (
                                    <option
                                        key={index}
                                        value={
                                            dept === "كل الإدارات" ? "" : dept
                                        }
                                    >
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={() => {
                                setSearchText("");
                                setFilters({
                                    location: "",
                                    role: "",
                                    department: ""
                                });
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-200"
                        >
                            إعادة الضبط
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4 text-gray-600">
                    <p>تم العثور على {filteredEmployees.length} نتيجة</p>
                </div>

                {/* Directory Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-center text-gray-700">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    {/* إزالة عمود الصورة */}
                                    <th className="px-6 py-4">الاسم</th>
                                    <th className="px-6 py-4">
                                        الصفة الوظيفية
                                    </th>
                                    <th className="px-6 py-4">الإدارة</th>
                                    <th className="px-6 py-4">الرقم الداخلي</th>
                                    <th className="px-6 py-4">الرقم المباشر</th>
                                    <th className="px-6 py-4">موقع العمل</th>
                                    {/* إزالة عمود الخيارات */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map(employee => (
                                        <tr
                                            key={employee.id}
                                            className="border-b border-gray-200 hover:bg-blue-50 transition duration-150"
                                        >
                                            {/* إزالة خلية الصورة */}
                                            <td className="px-4 py-3 font-medium">
                                                {employee.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${
                                                        employee.role === "مدير"
                                                            ? "bg-purple-100 text-purple-800"
                                                            : employee.role ===
                                                              "مهندس"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : employee.role ===
                                                              "فني"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {employee.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {employee.department}
                                            </td>
                                            <td className="px-4 py-3">
                                                {employee.internalNumber !==
                                                "لا يوجد" ? (
                                                    <a
                                                        href={`tel:${employee.internalNumber}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {
                                                            employee.internalNumber
                                                        }
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        لا يوجد
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {employee.directNumber !==
                                                "لا يوجد" ? (
                                                    <a
                                                        href={`tel:${employee.directNumber}`}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {employee.directNumber}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">
                                                        لا يوجد
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {employee.workLocation}
                                            </td>
                                            {/* إزالة خلية التفاصيل */}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            لا توجد نتائج مطابقة للبحث
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Employee Details Modal */}
            {selectedEmployee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    تفاصيل الموظف
                                </h3>
                                <button
                                    onClick={() => setSelectedEmployee(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="flex flex-col items-center mb-6">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 mb-4">
                                    <img
                                        src={selectedEmployee.photo}
                                        alt={selectedEmployee.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="text-xl font-bold">
                                    {selectedEmployee.name}
                                </h4>
                                <p className="text-gray-600">
                                    {selectedEmployee.role}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">
                                        الإدارة:
                                    </span>
                                    <span className="font-medium">
                                        {selectedEmployee.department}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">
                                        الرقم الداخلي:
                                    </span>
                                    <span className="font-medium">
                                        {selectedEmployee.internalNumber !==
                                        "لا يوجد" ? (
                                            <a
                                                href={`tel:${selectedEmployee.internalNumber}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {
                                                    selectedEmployee.internalNumber
                                                }
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">
                                                لا يوجد
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">
                                        الرقم المباشر:
                                    </span>
                                    <span className="font-medium">
                                        {selectedEmployee.directNumber !==
                                        "لا يوجد" ? (
                                            <a
                                                href={`tel:${selectedEmployee.directNumber}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {selectedEmployee.directNumber}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">
                                                لا يوجد
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">
                                        رقم الريفي:
                                    </span>
                                    <span className="font-medium">
                                        {selectedEmployee.reefNumber !==
                                        "لا يوجد" ? (
                                            <a
                                                href={`tel:${selectedEmployee.reefNumber}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {selectedEmployee.reefNumber}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">
                                                لا يوجد
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">
                                        رقم VoIP:
                                    </span>
                                    <span className="font-medium">
                                        {selectedEmployee.voipNumber &&
                                        selectedEmployee.voipNumber !==
                                            "لا يوجد" ? (
                                            <a
                                                href={`tel:${selectedEmployee.voipNumber}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {selectedEmployee.voipNumber}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">
                                                لا يوجد
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-gray-600">
                                        موقع العمل:
                                    </span>
                                    <span className="font-medium text-right">
                                        {selectedEmployee.workLocation}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => setSelectedEmployee(null)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-6 py-2 rounded-lg font-medium transition duration-200"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default PhoneDirectory;

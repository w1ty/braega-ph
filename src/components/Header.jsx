import logo from "/logo.png";

export default function Header() {
    return (
        <header className="bg-white shadow-lg border-b-4 border-red-600 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
                <div className="flex flex-col items-start">
                    <span className="text-red-700 text-base font-bold tracking-wide">
                        إدارة الحاسب الآلي والاتصالات
                    </span>
                    <span className="text-gray-500 text-xs font-medium mt-1">
                        منسقية الاتصالات
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <img
                        src={logo}
                        alt="شعار الشركة"
                        className="h-14 mb-1 drop-shadow"
                    />
                    <h1 className="text-2xl font-extrabold text-red-700 leading-tight">
                        دليل الهاتف الداخلي
                    </h1>
                    <h2 className="text-base text-gray-700 font-semibold">
                        شركة البريقة للنفط
                    </h2>
                </div>
                <div className="w-32" /> {/* Spacer for symmetry */}
            </div>
        </header>
    );
}

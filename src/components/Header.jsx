export default function Header() {
    return (
        <header className="bg-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-4 text-center relative">
                <div className="absolute left-0 top-0 px-2 py-1 text-gray-800 text-sm font-semibold">
                    إدارة الحاسب الآلي والاتصالات
                </div>
                <div className="absolute right-0 top-0 px-2 py-1 text-gray-800 text-sm font-semibold">
                    منسقية الاتصالات
                </div>
                <div className="inline-block border-4 border-yellow-500 rounded-lg px-8 py-4 bg-yellow-300 shadow-md">
                    <h1 className="text-3xl font-extrabold text-gray-800">
                        دليل الهاتف الداخلي
                    </h1>
                    <h2 className="text-lg text-gray-600 mt-2">
                        شركة البريقة للنفط
                    </h2>
                    <div className="flex justify-center mt-3">
                        <img
                            src="/logo.png"
                            alt="شعار الشركة"
                            className="h-16"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function Header() {
    return (
        <header className="bg-yellow-400 shadow-lg">
            <div className="container mx-auto px-4 py-6 text-center">
                <div className="inline-block border-4 border-yellow-600 rounded-lg px-8 py-4 bg-yellow-300 shadow-md">
                    <h1 className="text-3xl font-bold text-gray-800">
                        دليل الهاتف الداخلي
                    </h1>
                    <h2 className="text-2xl text-gray-700 mt-2">
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

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p>
                    © {new Date().getFullYear()} دليل الهاتف الداخلي - شركة
                    البريقة للنفط
                </p>
                <p className="mt-2 text-gray-400 text-sm">جميع الحقوق محفوظة</p>
            </div>
        </footer>
    );
}

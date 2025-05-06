export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-lg font-medium">
                    © {new Date().getFullYear()} دليل الهاتف الداخلي - شركة
                    البريقة للنفط
                </p>
                <p className="mt-3 text-gray-500 text-sm">
                    جميع الحقوق محفوظة
                </p>
            </div>
        </footer>
    );
}

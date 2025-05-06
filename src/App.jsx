import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal";
import employees from "./data/employees.json"; // Import employee data from JSON file

const PhoneDirectory = () => {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        role: "",
        department: "",
        section: "" // Added section to the filters state
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    return (
        <div className="font-['Cairo'] min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <SearchBar searchText={searchText} setSearchText={setSearchText} />
                    <Filters filters={filters} setFilters={setFilters} />
                </div>
                <EmployeeList
                    employees={employees}
                    filters={filters}
                    searchText={searchText}
                    setSelectedEmployee={setSelectedEmployee}
                />
                {selectedEmployee && (
                    <EmployeeDetailsModal
                        employee={selectedEmployee}
                        setSelectedEmployee={setSelectedEmployee}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default PhoneDirectory;
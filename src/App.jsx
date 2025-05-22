import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal";

const PhoneDirectory = () => {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        role: "",
        department: "",
        section: "" // Added section to the filters state
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("https://braega-ph.onrender.com/api/employees");
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

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
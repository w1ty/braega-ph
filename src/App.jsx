import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal";

const PhoneDirectory = ({ userRole }) => {
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({
        location: "",
        role: "",
        administration: "",
        department: ""
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [metadata, setMetadata] = useState({
        locations: {},
        roles: {},
        administrations: [],
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/metadata");
                const { locations, roles, departments, administrations } = response.data;

                // Map IDs to names for easier lookup
                const locationMap = Object.fromEntries(locations.map((loc) => [loc.id, loc.name]));
                const roleMap = Object.fromEntries(roles.map((role) => [role.id, role.name]));
                const administrationMap = Object.fromEntries(administrations.map((admin) => [admin.id, admin.name]));

                const translatedAdministrations = departments.map((department) => ({
                    ...department,
                    administration_name: administrationMap[department.administration_id] || "Unknown",
                }));

                setMetadata({
                    locations: locationMap,
                    roles: roleMap,
                    administrations: translatedAdministrations,
                });
            } catch (error) {
                console.error("Error fetching metadata:", error);
            }
        };

        fetchMetadata();
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
                    employees={employees.map((employee) => ({
                        ...employee,
                        location_name: metadata.locations[employee.location_id] || "Unknown",
                        role_name: metadata.roles[employee.role_id] || "Unknown",
                        department_name: metadata.administrations.find((d) => d.id === employee.department_id)?.name || "Unknown",
                        administration_name: metadata.administrations.find((d) => d.id === employee.department_id)?.administration_name || "Unknown",
                    }))}
                    filters={filters}
                    searchText={searchText}
                    setSelectedEmployee={setSelectedEmployee}
                    userRole={userRole}
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
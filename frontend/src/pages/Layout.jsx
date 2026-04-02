import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="p-4" style={{ backgroundColor: '#f9fafb', flexGrow: 1 }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;

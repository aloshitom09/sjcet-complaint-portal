import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

const DashboardLayout = ({ children, toggleTheme, isDark }) => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh', transition: 'background-color 0.3s' }}>
            <Sidebar isDark={isDark} />
            <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
                <Navbar toggleTheme={toggleTheme} isDark={isDark} />
                <div className="p-4 p-md-5 flex-grow-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

function App() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Init theme from local storage
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setIsDark(true);
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <DashboardLayout toggleTheme={toggleTheme} isDark={isDark}>
                            <Dashboard />
                        </DashboardLayout>
                    </PrivateRoute>
                } />
                
                <Route path="/admin" element={
                    <PrivateRoute>
                        <DashboardLayout toggleTheme={toggleTheme} isDark={isDark}>
                            <AdminDashboard />
                        </DashboardLayout>
                    </PrivateRoute>
                } />
                
                <Route path="/submit" element={
                    <PrivateRoute>
                        <DashboardLayout toggleTheme={toggleTheme} isDark={isDark}>
                            <SubmitComplaint />
                        </DashboardLayout>
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

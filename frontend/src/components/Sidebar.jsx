import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import sjcetLogo from '../assets/sjcet-logo.png';

const Sidebar = ({ isDark }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    let isAdmin = false;
    try {
        const u = localStorage.getItem('user');
        if (u) isAdmin = JSON.parse(u).role === 'admin';
    } catch(e) {}

    return (
        <div className={`sidebar d-none d-md-block shadow-sm z-3 position-relative ${isDark ? 'dark-sidebar' : ''}`}>
            <div className="p-4 mb-3 d-flex align-items-center gap-3 border-bottom pb-4" style={{ borderColor: 'var(--border-color)' }}>
                <img 
                    src={sjcetLogo} 
                    alt="SJCET Logo" 
                    className="sidebar-logo shadow-sm rounded-circle p-1 bg-white" 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://upload.wikimedia.org/wikipedia/en/2/22/SJCET_Palai_Logo.png'; }} 
                />
                <div>
                    <h5 className="fw-bolder mb-0 text-dynamic" style={{ letterSpacing: '-0.5px' }}>
                        SJCET
                    </h5>
                    <div className="small text-dynamic-muted fw-bold">Complaint Portal</div>
                </div>
            </div>
            
            <ul className="nav flex-column mt-2">
                {!isAdmin && (
                    <>
                        <li className="nav-item">
                            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
                                <i className="bi bi-grid-1x2-fill"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/submit" className={`nav-link ${isActive('/submit')}`}>
                                <i className="bi bi-pencil-square"></i> Submit Complaint
                            </Link>
                        </li>
                    </>
                )}
                {isAdmin && (
                    <>
                        <li className="nav-item">
                            <Link to="/admin?filter=All" className={`nav-link ${location.pathname === '/admin' && (!location.search || location.search.includes('All')) ? 'active' : ''}`}>
                                <i className="bi bi-list-ul"></i> All Complaints
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin?filter=Pending" className={`nav-link ${location.search.includes('Pending') ? 'active' : ''}`}>
                                <i className="bi bi-clock-history"></i> Pending Complaints
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin?filter=Resolved" className={`nav-link ${location.search.includes('Resolved') ? 'active' : ''}`}>
                                <i className="bi bi-check-circle"></i> Resolved Complaints
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin?filter=Rejected" className={`nav-link ${location.search.includes('Rejected') ? 'active' : ''}`}>
                                <i className="bi bi-x-circle"></i> Rejected Complaints
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;

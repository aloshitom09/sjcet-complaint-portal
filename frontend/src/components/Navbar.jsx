import React from 'react';
import { useNavigate } from 'react-router-dom';
import sjcetLogo from '../assets/sjcet-logo.png';

const Navbar = ({ toggleTheme, isDark }) => {
    const navigate = useNavigate();
    
    let user = { name: 'Student' };
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) user = JSON.parse(storedUser);
    } catch(e) { }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Take them all the way to landing instead of login to wipe roles natively
    };

    return (
        <nav className="navbar navbar-expand-lg top-navbar px-4 position-relative z-2">
            <div className="d-flex align-items-center d-md-none gap-2">
                <img 
                    src={sjcetLogo} 
                    alt="SJCET Logo" 
                    style={{ width: '32px', height: 'auto' }} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://upload.wikimedia.org/wikipedia/en/2/22/SJCET_Palai_Logo.png'; }} 
                />
                <span className="fw-bolder text-dynamic tracking-tight">SJCET Portal</span>
            </div>
            
            <div className="ms-auto d-flex align-items-center gap-3">
                {/* Theme Toggle Button */}
                <button 
                    onClick={toggleTheme}
                    className="btn btn-light rounded-circle border-0 d-flex align-items-center justify-content-center" 
                    style={{ width: '40px', height: '40px', backgroundColor: 'var(--bg-primary)'}}
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDark ? (
                        <i className="bi bi-sun-fill text-warning fs-5"></i>
                    ) : (
                        <i className="bi bi-moon-fill text-secondary fs-5"></i>
                    )}
                </button>

                <div className="dropdown">
                    <button 
                        className="btn border-0 dropdown-toggle d-flex align-items-center gap-2 p-1 pe-2 rounded-pill shadow-sm" 
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                        type="button" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width: 32, height: 32}}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="fw-bold text-dynamic me-1">{user.name}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-3 rounded-3" style={{ minWidth: '200px', backgroundColor: 'var(--bg-secondary)' }}>
                        <li className="px-3 py-2 border-bottom" style={{ borderColor: 'var(--border-color) !important' }}>
                            <span className="d-block fw-bold text-dynamic">{user.name}</span>
                            <span className="d-block small text-dynamic-muted">Logged In User</span>
                        </li>
                        <li><button className="dropdown-item py-2 fw-medium text-dynamic mt-1" onClick={() => navigate('/dashboard')}><i className="bi bi-person me-2"></i>My Profile</button></li>
                        <li><button className="dropdown-item py-2 fw-medium text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

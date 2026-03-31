import React from 'react';

const ProfileDropdown = ({ userName, onLogout }) => {
    return (
        <div className="dropdown">
            <button
                className="btn d-flex align-items-center gap-2 border-0 bg-transparent"
                style={{ cursor: 'pointer' }}
                type="button"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: '35px', height: '35px' }}
                >
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="fw-medium text-dark d-none d-md-block">{userName}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="profileDropdown">
                <li>
                    <button className="dropdown-item text-danger fw-medium" onClick={onLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ProfileDropdown;
